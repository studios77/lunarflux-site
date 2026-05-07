# LunarFlux AI - Technical Specification (기술 명세서)

본 문서는 LunarFlux AI에서 제공하는 각 서비스 도메인별 핵심 기술 스택과 상세 기술 요소를 정리한 명세서입니다. 기존 서비스 페이지에서 노출되던 상세 기술 태그들을 모아 체계적으로 분류했습니다.

---

## 1. IDC & 인프라 (Infrastructure & Cloud)

### 1.1 서버 임대 및 코로케이션
* **가상화 및 컴퓨팅 (Virtualization & Compute):** KVM, Bare Metal, VPS
* **인프라 관리 (Management):** IPMI (대역외 관리 원격 제어), OOB (Out-Of-Band)
* **AIDC (GPU 전용 호스팅):** NVIDIA RTX 5090, 고전력 랙 (초고전력 밀도 제어), 딥러닝 / LLM 최적화 환경

### 1.2 서버 위탁운영 (MSP)
* **모니터링 (Monitoring & Alerting):** Zabbix, Grafana, Nagios
* **자동화 및 스크립팅 (Automation):** Ansible, Shell Scripting

### 1.3 시스템 이중화 (HA & DB Cluster)
* **운영서버 고가용성 (HA):** Keepalived, HAProxy, Pacemaker, DRBD, Corosync
* **데이터베이스 이중화 (DB Cluster):** Galera Cluster, ProxySQL, Percona, MariaDB, MySQL
* **장애 복구 (Disaster Recovery):** 클라우드 VM / 온프레미스 연동 긴급 복구, 실시간 마이그레이션

---

## 2. AI 보안 (AI Security)

### 2.1 AI 보안 관제 및 자율 에이전트
* **보안 관제 플랫폼 (SIEM & SOAR):** Wazuh, SIEM(보안 정보 및 이벤트 관리), SOAR(보안 오케스트레이션 및 자동화 대응)
* **LLM 보안 에이전트:** Claude API, LangChain, LLM 기반 위협 분석 및 자율 대응(24/7)

### 2.2 스트림 및 네트워크 보안 (IDS/IPS)
* **스트림 이상 탐지:** Python ML, Fail2ban, MediaMTX 연동
* **네트워크 보안 엔진:** Suricata, Zeek, eBPF (Extended BPF), XDP (eXpress Data Path) 기반 초고속 패킷 처리 및 자동 차단

### 2.3 딥페이크 탐지 (Deepfake Detection)
* **AI 프레임워크 (Frameworks):** PyTorch, ONNX, TensorRT
* **탐지 모델 (Detection Models):** FaceForensics, DeepFaceLab 등 생성적 적대 신경망(GAN) 기반 영상 합성 추론/탐지

### 2.4 제로트러스트 및 LLM 거버넌스
* **제로트러스트 아키텍처 (Zero Trust):** IAM(신원 및 접근 관리), 마이크로 세그먼트, MFA(다중 인증), 조건부 접근(최소 권한)
* **LLM 보안 감사 (Audit):** 프롬프트 인젝션 방어, 데이터 분류, 거버넌스 로깅, Red Team (취약점 모의 해킹)

---

## 3. 스트리밍 미디어 솔루션 (Streaming & Media)

### 3.1 초저지연 스트리밍 (UltraStreamingEngine)
* **미디어 프로토콜 (Protocols):** WebRTC, LL-HLS (Low-Latency HLS), SRT (Secure Reliable Transport)
* **스트리밍 엔진 (Engine):** MediaMTX, FFmpeg (초저지연 고도화 튜닝)

### 3.2 VOD 관리 및 멀티 리스트림
* **미디어 처리 (Media Processing):** FFmpeg (실시간 트랜스코딩, 썸네일 자동 생성)
* **인프라 및 DB (Storage & DB):** MariaDB, Cloudflare (글로벌 CDN 및 객체 스토리지)
* **플랫폼 연동 (Integration):** YouTube API, Twitch API 다중 동시 송출 파이프라인
