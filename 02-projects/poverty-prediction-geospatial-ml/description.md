# Poverty Prediction Using Geospatial Machine Learning

## Metadata

**Type:** Competition Research Project  
**Date:** November 2025  
**Status:** Completed  
**Award:** 🥈 2nd Place - GEMASTIK 2025 Data Mining (National)  

**Technologies:** Python, PyTorch, LoRA, Sentinel-2, LightGBM, Geospatial Analysis, Computer Vision, Symmetric Cross-Entropy

**Links:**
- 🔗 GitHub: [Add your repository URL here](https://github.com/yourusername/poverty-prediction)
- 📄 Paper: [Add paper URL here](https://arxiv.org/...)
- 📊 Presentation: [Add presentation URL here](https://docs.google.com/presentation/...)
- 📈 Results Dashboard: [Add dashbaord URL here](https://...)
- 🏆 Related Competition: [GEMASTIK 2025](../../03-competitions-and-awards/gemastik-2025-data-mining-silver/description.md)

**Team Size:** [Add team size]  
**Role:** [Add your specific role]

---

## Short Description

Geospatial ML system achieving R² of 0.593 in poverty prediction using hybrid slow learner with LoRA, reducing catastrophic forgetting by 81.5% through multi-proxy learning from Sentinel-2 satellite imagery (NTL, NDVI, LST).

## Long Description

This project applies computer vision and geospatial machine learning to poverty estimation—using satellite imagery to predict economic conditions across geographic regions. While traditional poverty measurement relies on expensive, time-consuming ground surveys, satellite data offers continuous, scalable monitoring with global coverage.

## The Challenge

Measuring poverty accurately matters enormously for policy design, resource allocation, and development tracking. But comprehensive surveys are prohibitively expensive in many regions, conducted infrequently, and become outdated quickly.

Could freely available satellite data provide reliable poverty indicators? The hypothesis: economic activity leaves visible marks—nighttime lights, vegetation patterns, infrastructure development, urban density—that correlate with prosperity levels.

## Multi-Proxy Approach

We leveraged three satellite-derived proxies, each capturing different economic dimensions:

**Nighttime Light (NTL)** intensity indicates economic activity and electrification. Brighter areas generally correlate with higher economic development, though the relationship isn't linear.

**Normalized Difference Vegetation Index (NDVI)** captures agricultural productivity and land use patterns. In agricultural economies, vegetation health relates to economic conditions.

**Land Surface Temperature (LST)** reflects urbanization patterns. Urban heat islands, building materials, and infrastructure alter surface temperatures in ways that correlate with development.

## Technical Architecture

### Hybrid Slow Learner

Our breakthrough was implementing a hybrid slow learner architecture combining LoRA (Low-Rank Adaptation) with Symmetric Cross-Entropy for multi-task learning. This reduced catastrophic forgetting by 81.5% compared to baseline approaches.

Catastrophic forgetting occurs when training a model on new tasks degrades performance on previously learned tasks. In our case, learning to predict poverty from LST data would interfere with previously learned NTL patterns. The hybrid slow learner maintains stable learning across all three proxy tasks simultaneously.

LoRA enables efficient fine-tuning of large models by inserting low-rank matrices that adapt model behavior without modifying original weights. This parameter efficiency makes multi-task learning practical.

Symmetric Cross-Entropy provides robust loss formulation that handles noisy labels—important since satellite-derived proxies are imperfect ground truth.

### Feature Aggregation

We aggregated Sentinel-2 visual features with geospatial data using LightGBM. Sentinel-2 provides 10-meter resolution multispectral imagery—detailed enough to capture local variation but covering continental scales.

Visual features extracted from Sentinel-2 included texture patterns, spectral indices, spatial statistics, and temporal changes. We combined these with contextual geospatial data: population density, road network density, distance to urban centers, and administrative boundaries.

LightGBM handled this heterogeneous feature space effectively. Its gradient boosting framework captures non-linear relationships and feature interactions while maintaining training efficiency on large geospatial datasets.

## Results

We achieved R² of 0.593 in poverty prediction—explaining nearly 60% of poverty variation using satellite data alone. This outperformed baseline approaches by 3.9 to 10.4 points, representing statistically significant improvements.

The performance validates that satellite proxies contain genuine predictive signals about economic conditions. While not perfect substitutes for ground truth surveys, they enable continuous monitoring and rapid updating.

## Error Analysis

Model errors weren't random. Performance varied across different contexts:

**Urban vs Rural** - Urban areas showed higher prediction accuracy. The proxies (especially NTL) capture urban economic signals more clearly than rural agricultural economies.

**Geographic Variation** - Some regions showed systematic over or under-prediction. This likely reflects regional differences in economic structures not fully captured by our proxy features.

**Temporal Stability** - Seasonal variation in NDVI required careful handling. Agricultural cycles create vegetation changes that don't necessarily indicate poverty changes.

These patterns suggest refinement opportunities: region-specific models, temporal modeling of seasonal patterns, and incorporating additional proxies like road infrastructure or building density.

## Aksara Jawa OCR Component

The competition included a finals challenge: build Aksara Jawa (Javanese script) OCR in 5 hours. Under intense time pressure, we achieved 98.8% accuracy through rapid computer vision prototyping.

This required quick adaptation: understanding Aksara Jawa character structure, selecting appropriate network architectures, implementing data augmentation for limited training samples, and aggressive hyperparameter tuning within time constraints.

The exercise demonstrated versatility—applying computer vision skills across very different domains (geospatial poverty prediction and historical script recognition) under varied constraints (large-scale research vs rapid prototyping).

## Broader Impact

Satellite-based poverty mapping enables applications impossible with survey-only approaches:

**Real-time Monitoring** - Track poverty changes continuously rather than waiting years between surveys.

**Disaster Response** - Rapidly assess economic impacts of natural disasters, conflicts, or health crises.

**Policy Targeting** - Identify specific communities needing assistance with geographic precision.

**Validation** - Cross-check government statistics and survey results for data quality.

The approach generalizes beyond poverty to other development indicators: education access, health outcomes, infrastructure quality, environmental conditions.

## Technical Lessons

**Multi-task Learning Requires Careful Architecture** - Naive approaches suffer severe catastrophic forgetting. Techniques like LoRA and specialized loss functions make multi-task learning practical.

**Geospatial Data Has Unique Characteristics** - Spatial autocorrelation, boundary effects, projection choices, and resolution mismatches require domain-specific handling.

**Ensemble Methods Excel With Heterogeneous Features** - LightGBM effectively combined visual features, spectral indices, and contextual data that have very different statistical properties.

**Validation Strategy Matters** - Spatial cross-validation prevents overoptimistic performance estimates from spatially autocorrelated data.

## Future Directions

Production deployment could incorporate temporal modeling for capturing trends over time, additional proxies from radar, hyperspectral, or commercial satellite data, causal modeling to distinguish correlation from causation, and integration with ground survey data for hybrid estimates.

The hybrid slow learner architecture developed here generalizes beyond poverty prediction to any multi-task learning problem with catastrophic forgetting challenges.

This project demonstrated that geospatial machine learning can address real development challenges. Combining satellite data, computer vision, and careful modeling creates scalable monitoring capabilities that complement traditional methods, expanding what's possible in development economics and policy research.
