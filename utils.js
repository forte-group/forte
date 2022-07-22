
export async function protectPage(user) {
    if (!user) {
        location.replace(getAuthRedirect());
    }
}

export function getAuthRedirect() {
    const redirectUrl = encodeURIComponent(location.href);
    return `/auth/?redirectUrl=${redirectUrl.toString()}`;
}

export function checkForMatch(arr1, arr2) {

    let matches = 0;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === arr2[i]) {
            matches++;
        }
    }
    if (matches === arr1.length) {
        return true;
    }
    else {
        return false;
    }
}