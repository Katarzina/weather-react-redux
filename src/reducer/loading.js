// const
export const LOADING_WEATHER = 1;

export const LOADING = 'LOADING';
export const LOADED = 'LOADED';

export const loading = (state = [], action) => {

    const {type, payload} = action;

    switch (type) {
        case (LOADING) :
            state.push(payload);
            break;
        case (LOADED) :
           const i = state.indexOf(payload);

           if(i !== -1){
               delete state[i]
           }

           break;
        default:
           return state
    }

    return state
}


export const isLoaded = (state, tag = 1) =>  (
         tag !== null
            ? state.includes(tag)
            : state.length === 0
)
