# AutoPayload AI — Phase-by-Phase Master Plan

_Immutable roadmap. Each phase ≤ 1 week, demo-able, additive._

---

## 🎯 North-Star Goal

Build an autonomous browser agent that **crawls like a human**, **remembers forever**, and **learns to fill forms better every run** via a depth-first mind-map of every UI state, action, and payload.

---

## 🏗️ Storage & Infra (locked)

| Layer              | Tech                                   | Purpose                            |
| ------------------ | -------------------------------------- | ---------------------------------- |
| **Language**       | TypeScript 5.x on Node 20 LTS          |
| **Browser**        | Playwright-Chromium (headless)         |
| **Object Storage** | MinIO (S3-API)                         | PNG, DOM, HAR, traces              |
| **Graph DB**       | Neo4j                                  | Nodes = UI states, Edges = Actions |
| **Vector DB**      | pgvector                               | Semantic search over DOM           |
| **Queue / KV**     | Redis + BullMQ                         | DFS frontier & dedupe              |
| **Queue Workers**  | Node worker_threads                    |
| **KV Cache**       | Redis LRU                              | LLM prompt cache                   |
| **Dashboard**      | React 18 + Vite + Tailwind + WebSocket |
| **CI/CD**          | GitHub Actions → Docker → Helm (K8s)   |

---

## 🧩 Phase Plan

### **Phase 0 – Skeleton & Dev-Loop** _(Week 0)_

- **Goal**: one repo, one `pnpm dev`, green CI in <5 min.
- **Tasks**
  1. Turbo monorepo (pnpm workspaces)
  2. Shared lint, prettier, tsconfig
  3. `docker-compose.yml` → Node dev, Mongo, Redis, MinIO, Neo4j, pgvector
  4. GitHub Actions (build, lint, test, docker)
  5. CLI stub: `npx auto-payload --url …` → “Hello AutoPayload”
- **Deliverable**  
  `make dev` spins everything; PR passes CI.

---

### **Phase 1 – Snapshot & Blob Lake** _(Week 1)_

- **Goal**: every browser state captured **forever**.
- **Tasks**
  1. Playwright service
  2. After each `goto` or major action:
     - PNG → MinIO `/snapshots/{uuid}.png`
     - Raw DOM → `/dom/{uuid}.html`
     - HAR → `/har/{uuid}.har.gz`
     - trace.zip → `/trace/{uuid}.zip`
  3. Create immutable `Node` in Neo4j (`id = hash(url+dom)`)
- **Deliverable**  
  CLI run → 3-4 files in MinIO + 1 node in Neo4j.

---

### **Phase 2 – Embed & Vector Search** _(Week 2)_

- **Goal**: semantic search over any DOM.
- **Tasks**
  1. MiniLM embedding (384-d) of cleaned DOM text
  2. Store in pgvector (`embedding` column)
  3. REST endpoint `/similar?nodeId=…&k=5`
- **Deliverable**  
  Query <50 ms, returns closest DOM states.

---

### **Phase 3 – DFS Frontier & Resume** _(Week 3)_

- **Goal**: bounded depth-first crawl that pauses and resumes.
- **Tasks**
  1. Redis queue `dfs:frontier`  
     job = `{nodeId, depth, url, cookies, localStorage}`
  2. Worker pops, explores, pushes unseen children
  3. Deduplication via DOM hash
  4. CLI flags `--max-depth=N`, `--resume-from-node <id>`
- **Deliverable**  
  Two CLI runs: first depth 2, second resumes from leaf.

---

### **Phase 4 – Smart Form Filler** _(Week 4)_

- **Goal**: LLM generates realistic inputs using schema + memory.
- **Tasks**
  1. Load OAS / GraphQL → field hints
  2. Prompt LLM with current form + k-nearest vector nodes
  3. Retry (≤3) on validation errors
  4. Save prompt/response in Edge record
- **Deliverable**  
  CLI logs “filled form, 2 retries, payload accepted”.

---

### **Phase 5 – Live Dashboard** _(Week 5)_

- **Goal**: watch crawler, browse mind-map.
- **Tasks**
  1. React + Vite + Tailwind
  2. WebSocket push every 2 s (screenshot + tree updates)
  3. Neo4j driver → force-directed graph
  4. Click node → replay
- **Deliverable**  
  Open UI → see crawler crawling, graph growing.

---

### **Phase 6 – Multi-Agent Scale** _(Week 6)_

- **Goal**: N workers, one queue.
- **Tasks**
  1. BullMQ workers (Node worker_threads)
  2. 1 worker ≈ 5–10 contexts (configurable)
  3. pm2 in prod, CPU autoscale
  4. Dashboard tab per worker
- **Deliverable**  
  `pnpm scale --workers=5` → 5 agents, 5 feeds.

---

### **Phase 7 – Nightly Training Export** _(Week 7)_

- **Goal**: feed any ML pipeline.
- **Tasks**
  1. Nightly job: Nodes & Edges → Parquet on S3
  2. PNG, HAR refs preserved
  3. Sample notebook: fine-tune MiniLM on success vs failure
- **Deliverable**  
  `aws s3 ls s3://bucket/exports/2024-07-25/...`

---

### **Phase 8 – Replay Engine** _(Week 8)_

- **Goal**: deterministic re-run of any path.
- **Tasks**
  1. CLI `replay --nodeId <leaf>`
     - exact cookies, storage, actions
     - diff responses
  2. `--headless=false` for visual diff
- **Deliverable**  
  `pnpm replay --nodeId abc123` → pass/fail report.

---

### **Phase 9 – CAPTCHA / 2FA Skip & Log** _(Week 9)_

- **Goal**: never stall, always log.
- **Tasks**
  1. Detect heuristics (iframe captcha, OTP input)
  2. Mark node `blocked: true`, save screenshot + DOM
  3. Dashboard red flag
- **Deliverable**  
  UI shows “CAPTCHA detected at depth 4 – skipped”.

---

### **Phase 10 – Prod & Autoscale** _(Week 10)_

- **Goal**: Kubernetes-ready, observable.
- **Tasks**
  1. Docker images, Helm charts
  2. HPA on CPU + queue depth
  3. Prometheus metrics, Grafana dashboards
  4. Nightly chaos test on staging
- **Deliverable**  
  `helm install autopayload` → 30 pods, 300 contexts.

---

## 🏁 Next Action

Create the repo and open **Phase 0** pull request today.
