import {GameState} from "@/data/engine/state";

interface DictionaryDialogProps {
    state: GameState;
    open: boolean;
    onClose: () => void;
}

export default function DictionaryDialog({state, open, onClose}: DictionaryDialogProps) {
    return null;
}