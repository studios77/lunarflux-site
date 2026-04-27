/**
 * 도메인 타입 단일 진입점 — 새 코드·리팩터 시 여기서 import 하면 슬러그·서비스 모델 추론이 빨라집니다.
 */
export type { ColoPlan, ServiceData, ServiceSlug } from './servicesData'
export { SERVICE_SLUGS, findServiceBySlug, getServiceBySlug, servicesData } from './servicesData'
