export function checkAttributesExist(object, attributeList) {
    for (const attribute of attributeList) {
        if (!object.hasOwnProperty(attribute)) {
            return false;
        }
    }
    return true;
}