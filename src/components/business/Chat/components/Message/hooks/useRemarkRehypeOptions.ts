import { useMemo } from "react";
import { REMARK_REHYPE_OPTIONS } from "../constants";
import { toFootnotePrefix } from "../markdown";

export const useRemarkRehypeOptions = (id: string) =>
  useMemo(
    () => ({ ...REMARK_REHYPE_OPTIONS, clobberPrefix: toFootnotePrefix(id) }),
    [id],
  );
