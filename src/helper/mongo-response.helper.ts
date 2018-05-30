export function mongoResponse(entity: any) {
    const { _id: id, ...data } = entity;
    const merge = {
        ...data,
        id,
    };

    return merge;
}
