import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { FloatingMenuItem } from '../FloatingMenuItems/FloatingMenuItem';
import { Environment } from '../types';
import { BaseZustandState, ZustandUtils } from '../_zustand/Zustand'
export interface CreateAiPromptPanelState extends BaseZustandState {
    id:string
    allMenuItems: FloatingMenuItem[]
    document: Document | null,  
    environment: string;
    activeMenuInfo: any | null;
    setActiveMenuInfo: (item: any | null) => void;
    isParamsModalOpen: boolean;
    setParamsModalOpen: (open: boolean) => void;
    setAllMenuItems: (items: any[]) => void;
  // toSerializeJsonString:() => string
  // toJsonString:() => string
}





export const CreateAiPromptPanelStateActions = (set:any, get:any /** zustand set get */) => ({
    id: 'CreateAiPromptPanelStateActions',
    document: null,
    environment: Environment.WEB,
    activeMenuInfo: null,
    isParamsModalOpen: false,
    allMenuItems: [],

    setAllMenuItems(items: any[]) {
        ZustandUtils.setState(set, get, (state: CreateAiPromptPanelState) => {
          state.allMenuItems = items
        })
      },
    
      
    setParamsModalOpen(open: boolean) {
        ZustandUtils.setState(set, get, (state: CreateAiPromptPanelState) => {
          state.isParamsModalOpen = open
        })
      },

      setActiveMenuInfo(item: any | null) {
        ZustandUtils.setState(set, get, (state: CreateAiPromptPanelState) => {
          state.activeMenuInfo = item
        })
      },

    setEnvironment(environment: Environment) {
        ZustandUtils.setState(set, get, (state: CreateAiPromptPanelState) => {
          state.environment = environment
        })
      },

    setId(id: string) {
        ZustandUtils.setState(set, get, (state: CreateAiPromptPanelState) => {
          state.id = id
        })
      },

    

      setDocument(document: Document) {
        ZustandUtils.setState(set, get, (state: CreateAiPromptPanelState) => {
          state.document = document
        })
      },

  })


export const useAiPromptPanelState = create<CreateAiPromptPanelState>((set, get) => (CreateAiPromptPanelStateActions(set, get)))

export default useAiPromptPanelState

