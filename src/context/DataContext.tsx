import  { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';



interface TableData {
    total?: number;
    pageIndex: number;
    pageSize: number;
    query?: string;
    sort?: {
        orderBy: string;
        key: string | any;
    };
    startCursor?:string;
    endCursor?:string;
    hasPreviousPage?:boolean;
    hasNextPage?:boolean;
}

interface State {
    loading: boolean;
    repositories: any[];
    tableData: TableData;
    filterData: Record<string, any>;
    modalOpen: {name:string,open:boolean};
}

type Action =
    | { type: 'UPDATE_REPOSITORIES_DATA'; payload: any[] }
    | { type: 'SET_TABLE_DATA'; payload: TableData }
    | { type: 'SET_FILTER_DATA'; payload: Record<string, any> }
    | { type: 'SET_MODAL_OPEN'; payload: {name:string,open:boolean} }
    | { type: 'SET_LOADING'; payload:boolean }


const initialState: State = {
    loading: false,
    repositories: [],
    tableData: {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: {
            orderBy: '',
            key: '',
        },
    },
    modalOpen: {name:'',open:false},
    filterData: {},
};

const DataStateContext = createContext<State | undefined>(undefined);
const DataDispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

function dataReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'UPDATE_REPOSITORIES_DATA':
            return { ...state, repositories: action.payload };
        case 'SET_TABLE_DATA':
            return { ...state, tableData: action.payload };
        case 'SET_FILTER_DATA':
            return { ...state, filterData: action.payload };
        case 'SET_MODAL_OPEN':
            return { ...state, modalOpen: action.payload };
        case 'SET_LOADING' :
            return {...state,loading:action.payload}
        default:
            return state;
    }
}

interface DataProviderProps {
    children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
    const [state, dispatch] = useReducer(dataReducer, initialState);

    return (
        <DataStateContext.Provider value={state}>
            <DataDispatchContext.Provider value={dispatch}>
                {children}
            </DataDispatchContext.Provider>
        </DataStateContext.Provider>
    );
}

export function useDataState(): State {
    const context:any = useContext(DataStateContext);
    // if (context === undefined) {
        // throw Error('useDataState must be used within a DataProvider');
    // }
    return context; 
}

export function useDataDispatch(): Dispatch<Action> {
    const context = useContext(DataDispatchContext);
    if (context === undefined) {
        throw Error('useDataDispatch must be used within a DataProvider');
    }
    return context;
}
