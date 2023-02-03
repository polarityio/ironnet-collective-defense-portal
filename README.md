# Polarity IronNet Collective Defense Portal Integration
![image](https://img.shields.io/badge/status-beta-green.svg)

IronNet Collective Defense Portal helps you detect threats, exchange insights, and stop attacks faster. The Polarity IronNet Integration allows you to search with IronNet Collective Defense Portal's `Alert`, `Event`, & `Indicator` data via Domains, URLs, IP Addresses, & Emails.


To learn more about IronNet Collective Defense Portal, visit the [official website](https://www.ironnet.com/).


## IronNet Collective Defense Portal Integration Options

### Your API Token
Can be found on the IronNet Collective Defense Portal dashboard -> User Icon in the upper right hand corner -> API Access.

### Minimum Severity
The Minimum Severity for Alerts, Indicators, and Events to show up in search results.

### Ignore Analyst Severities
The Analyst Severities you wish to exclude from your search results.

### Ignore Categories
The Categories you wish to exclude from your search results.

### Ignore Sub Categories
The Sub Categories you wish to exclude from your search results.

### Speed Up Search
If checked, we will only search for an exact string match on entities, which speeds up the search at times up to 3x & can help prevent timeout errors.

This does result in fewer search results.  For Example:
- ***Unchecked***: foo.com -> gets Alerts, Indicators, & Events for [foo.com, eu-1-foo.com, goodfoo.com ...]
- ***Checked***: foo.com -> gets Alerts, Indicators, & Events for [foo.com] only).


## Installation Instructions

Installation instructions for integrations are provided on the [PolarityIO GitHub Page](https://polarityio.github.io/).


## Polarity

Polarity is a memory-augmentation platform that improves and accelerates analyst decision making.  For more information about the Polarity platform please see:

https://polarity.io/
