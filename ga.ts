// GA4の測定ID。ページのソースに出る公開の値なのでコードに持つ（環境変数があればそちらを優先）
export const gaMeasurementId: string | undefined = (import.meta as any).env?.VITE_GA_MEASUREMENT_ID || 'G-49FVPV2EMB';
