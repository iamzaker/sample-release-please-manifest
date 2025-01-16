interface FeatureFlags {
  [key: string]: boolean;
}

class FeatureFlagService {
  private flags: FeatureFlags;

  constructor(initialFlags: FeatureFlags) {
    this.flags = initialFlags;
  }

  isFeatureEnabled(feature: string): boolean {
    return this.flags[feature] || false;
  }

  enableFeature(feature: string): void {
    this.flags[feature] = true;
  }

  disableFeature(feature: string): void {
    this.flags[feature] = false;
  }

  getAllFlags(): FeatureFlags {
    return this.flags;
  }
}

export default FeatureFlagService;