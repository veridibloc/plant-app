export interface PageProps<P extends object,Q extends object = {}> {
    params: P,
    searchParams: Q
}
