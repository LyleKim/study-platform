import type { PageLoad } from './$types';

export function load({ url }) {
    const idParam = url.searchParams.get('id');
    return {
        id: idParam ? parseInt(idParam, 10) : null
    };
}
