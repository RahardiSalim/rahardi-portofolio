# 1st Place - URL Phishing Detection, DSC Olympiad 2025

## Short Description

Gold medal at Binus University's Data Science Club Olympiad 2025 for building high-accuracy URL phishing detection system using machine learning and feature engineering techniques.

## Long Description

The Data Science Club Olympiad at Binus University focused on a critical cybersecurity challenge: detecting phishing URLs. As cyber threats grow more sophisticated, reliably identifying malicious URLs becomes increasingly difficult. Legitimate-looking URLs can hide dangerous phishing attempts, while unusual-looking URLs might be perfectly safe.

Our winning solution combined domain expertise in cybersecurity with rigorous machine learning methodology. The key insight was that phishing URLs exhibit subtle patterns in their structure—patterns too nuanced for simple rule-based filtering but detectable through properly engineered features and trained models.

Feature engineering drove our success. We extracted URL lexical features (length, special character frequency, subdomain structure), host-based features (domain age, WHOIS information, DNS records), and page content features (form presence, JavaScript behavior, encryption status). Each feature captured different dimensions of legitimacy versus maliciousness.

The challenge was balancing false positives and false negatives. Blocking legitimate URLs frustrates users and erodes trust. Missing phishing URLs exposes users to attacks. Our model needed to be both sensitive (catching phishing attempts) and specific (avoiding false alarms).

We experimented with multiple classifiers—Random Forests for handling non-linear feature interactions, Gradient Boosting for sequential error correction, and ensemble methods for combining diverse models. Careful cross-validation ensured our performance metrics reflected real-world robustness, not overfitting to the competition dataset.

The judges evaluated submissions on accuracy, but also on methodology rigor and presentation clarity. Winning required not just building an accurate model, but articulating our approach, justifying design decisions, and demonstrating understanding of the problem domain.

This competition sharpened several technical skills: systematic feature engineering, thoughtful model selection, and rigorous evaluation methodology. But it also reinforced that effective data science requires domain knowledge. Understanding how phishing works—what tactics attackers use, what signals indicate malicious intent—informed which features to engineer and how to interpret model predictions.

Securing first place validated our approach to machine learning competitions: combine domain expertise, systematic experimentation, and clear communication. The best models aren't just statistically performant—they solve real problems in defensible, interpretable ways.
