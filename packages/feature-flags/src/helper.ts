import FeatureFlagService from './feature-flag-service';
import featureFlags from './config';

export const featureFlagService = new FeatureFlagService(featureFlags);

console.log('Feature A enabled:', featureFlagService.isFeatureEnabled('featureA'));
console.log('Feature B enabled:', featureFlagService.isFeatureEnabled('featureB'));

featureFlagService.enableFeature('featureB');
console.log('Feature B enabled after enabling:', featureFlagService.isFeatureEnabled('featureB'));

featureFlagService.disableFeature('featureA');
console.log('Feature A enabled after disabling:', featureFlagService.isFeatureEnabled('featureA'));

console.log('All feature flags:', featureFlagService.getAllFlags());