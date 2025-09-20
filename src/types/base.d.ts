interface GenericWrapperComponent {
    children: ReactNode;
};

type OptionalAttribute<T> = {
    [ K in keyof T ]?: T[K];
};
