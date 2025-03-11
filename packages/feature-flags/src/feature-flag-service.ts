/** Interface for managing feature flag states */
interface FeatureFlags {
  [key: string]: boolean;
}

/** Service class for managing feature flags in the application */
class FeatureFlagService {
  /** Internal storage of feature flag states */
  private flags: FeatureFlags;

  /**
   * Creates a new feature flag service instance
   * @param initialFlags - Initial set of feature flags
   */
  constructor(initialFlags: FeatureFlags) {
    this.flags = initialFlags;
  }

  /**
   * Check if a feature is enabled
   * @param feature - Name of the feature to check
   * @returns boolean indicating if feature is enabled
   */
  isFeatureEnabled(feature: string): boolean {
    return this.flags[feature] || false;
  }

  /**
   * Enable a specific feature
   * @param feature - Name of the feature to enable
   */
  enableFeature(feature: string): void {
    this.flags[feature] = true;
  }

  /**
   * Disable a specific feature
   * @param feature - Name of the feature to disable
   */
  disableFeature(feature: string): void {
    this.flags[feature] = false;
  }

  /**
   * Get all feature flags
   * @returns Object containing all feature flags and their states
   */
  getAllFlags(): FeatureFlags {
    return this.flags;
  }
}

export default FeatureFlagService;