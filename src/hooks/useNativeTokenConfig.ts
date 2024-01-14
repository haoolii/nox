import { TokenType } from "../core/enums";
import { useConfig } from "./useConfig";

export const useNativeTokenConfig = () => {
    const { tokens } = useConfig();
  
    return tokens.find(token => token.type === TokenType.NATIVE);
  }