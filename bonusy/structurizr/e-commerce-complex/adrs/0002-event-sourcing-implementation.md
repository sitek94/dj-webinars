# ADR-002: Event Sourcing Implementation

## Context
Need real-time inventory updates across distributed systems.

## Decision
Use Apache Kafka for event streaming between services.

## Consequences
- ✅ Decoupled service communication
- ✅ Audit trail of system state changes
- ❌ Added latency in read operations
