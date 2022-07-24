export const POST_SHIP = 'POST_SHIP';
export const POST_SEARCH_SHIP_KEYWORD = 'POST_SEARCH_SHIP_KEYWORD';

export const postShip = (payload) => {
    return {
        type: POST_SHIP,
        payload
    }
};

export const postSearchShipKeyWord = (payload) => {
    return {
        type: POST_SEARCH_SHIP_KEYWORD,
        payload
    }
}