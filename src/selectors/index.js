export const getIsPelengationPanelReady = ({ pelengReducer }) => pelengReducer.isPelengationPanelOpen;
export const getCurrentPeleng = ({ pelengReducer }) => pelengReducer.currentPeleng;
export const getPelengsAmount = ({ pelengReducer }) => pelengReducer.pelengsCounter;
export const getPelengsToDraw = ({ pelengReducer }) => pelengReducer.pelengsToDraw;

export const isLoading = (({ loaderReducer }) => Object.keys(loaderReducer.actions).length);

export const getUnitNames = (({ unitsReducer }) => unitsReducer.unitNames);

export const getFlowSidebarContentType = ({ flowSidebarReducer }) => flowSidebarReducer.contentType;
