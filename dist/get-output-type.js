export const GetOutputType = (type) => {
    if (type == 'warning')
        return '⚠️ Warning';
    if (type == 'error')
        return '❌ Error';
    if (type == 'success')
        return '✅ Success';
    if (type == 'info')
        return 'ℹ️ Info';
    if (type == 'user_update')
        return '👤 User Update';
    if (type == 'recommendation')
        return '💡 Recommendation';
    if (type == 'snapshot')
        return '📸 Snapshot';
    return undefined;
};
