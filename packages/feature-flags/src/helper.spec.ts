import FeatureFlagService from './feature-flag-service';
import featureFlags from './config';
import { featureFlagService } from './helper';

describe('FeatureFlagService', () => {
    beforeEach(() => {
        // Reset the feature flags before each test
        featureFlagService.disableFeature('featureA');
        featureFlagService.disableFeature('featureB');
    });

    test('should check if feature A is enabled', () => {
        expect(featureFlagService.isFeatureEnabled('featureA')).toBe(false);
    });

    test('should check if feature B is enabled', () => {
        expect(featureFlagService.isFeatureEnabled('featureB')).toBe(false);
    });

    test('should enable feature B', () => {
        featureFlagService.enableFeature('featureB');
        expect(featureFlagService.isFeatureEnabled('featureB')).toBe(true);
    });

    test('should disable feature A', () => {
        featureFlagService.enableFeature('featureA');
        featureFlagService.disableFeature('featureA');
        expect(featureFlagService.isFeatureEnabled('featureA')).toBe(false);
    });

    // test('should get all feature flags', () => {
    //     featureFlagService.enableFeature('featureA');
    //     featureFlagService.enableFeature('featureB');
    //     const allFlags = featureFlagService.getAllFlags();
    //     expect(allFlags).toEqual({
    //         featureA: true,
    //         featureB: true,
    //     });
    // });
});