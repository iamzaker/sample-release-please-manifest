#!/bin/bash

# Start time
start_time=$(date +%s)

# Enable debugging
# set -x

# Save the current working directory
original_dir=$(pwd)

# Define the path to your JSON file
json_file="scripts/dependency-graph.json"

calculate_duration() {
  ELAPSED=$(($(date +%s) - start_time))
  printf "elapsed: %s\n\n" "$(date -d@$ELAPSED -u +%H\ hours\ %M\ min\ %S\ sec)"
}

# Loop over each object in the JSON array
for package in $(jq -r '.[] | @base64' "$json_file"); do
  # Decode the JSON object
  name=$(echo "$package" | base64 --decode | jq -r '.name')
  path=$(echo "$package" | base64 --decode | jq -r '.path')
  dependencies=$(echo "$package" | base64 --decode | jq -r '.dependencies')
  type=$(echo "$package" | base64 --decode | jq -r '.type')

  # Print package details
  if [ "$dependencies" = "[]" ]; then
    echo "package name: $name, package path: $path, type: $type, package dependencies: No dependencies found"
  else
    dep_list=$(echo "$dependencies" | jq -r '.[]')
    echo "package name: $name, package path: $path, package dependencies: $dep_list, type: $type"
  fi
  
  # Check if the path starts with 'packages/' or if it's directly at the root level
  if [[ "$path" == packages/* ]]; then
    # If it starts with 'packages/', strip 'packages/' to get the correct subdirectory
    dir_path="$path"
  else
    # Otherwise, it's assumed to be a sibling directory at the root level
    dir_path="./$path"
  fi

  # Change to the package path
  echo "Changing to directory: $dir_path"
  cd "$dir_path" || { echo "Failed to cd into $dir_path"; continue; }
  echo "Current directory: $(pwd)"  # Print the current directory (package path)
  
  # Unlink the package if it's already linked
  if [ "$type" == "library" ]; then
    echo "Unlinking package: $name"
    npm unlink $name
  fi
  
  # Install dependencies
  echo "Installing dependencies for package: $name"
  if [ -f "package-lock.json" ]; then
    echo "Found package-lock.json, running npm ci for deterministic installs."
    npm ci
  else
    echo "No package-lock.json found, running npm i."
    npm i
  fi

  if [ "$dependencies" != "[]" ]; then # if the package has dependencies then link them at once
    echo "Linking dependencies($dep_list) for package: $name "
    npm link $dep_list 
  else
    echo "No dependencies found for package: $name"
  fi

  echo "Building package: $name"
  npm run build

  if [ "$type" == "library" ]; then
    echo "Linking package: $name"
    npm link
  fi

  # Return to the original directory
  cd "$original_dir" || { echo "Failed to return to $original_dir"; continue; }
  echo "Returned to original directory: $(pwd)"  # Print the original directory path
  
  echo "------------------------------------"
done

# set +x

end_time=$(date '+%Y-%m-%d %H:%M:%S')

# Calculate duration
calculate_duration