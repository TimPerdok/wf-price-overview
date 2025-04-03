type Action<ReturnType> = (value: any) => ReturnType

type MatchCase<ReturnType> = {
    action: Action<ReturnType>;
    condition: (value: any) => boolean;
};

export default function match<ReturnType>(defaultAction: Action<ReturnType>, ...matchCases: MatchCase<ReturnType>[]): (value: any) => ReturnType {
    return (value: any) => {
        const matchCase = matchCases.find((matchCase) => {
            try {
                return matchCase.condition(value);
            } catch (e) {
                console.error("Error in match case condition", e);
                return false;
            }
        });
        if (matchCase) {
            return matchCase.action(value);
        } else {
            return defaultAction(value);
        }
    };

}