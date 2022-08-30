import { useEffect } from 'react';

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * Source: https://stackoverflow.com/a/57632587/
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */
// export default function useUpdateEffect(effect, dependencies = []) {
//   const isInitialMount = useRef(true);

//   useEffect(() => {
//     if (isInitialMount.current) {
//       isInitialMount.current = false;
//     } else {
//       return effect();
//     }
//   }, dependencies);
// }

const useUpdateEffect = useEffect;

export default useUpdateEffect;
