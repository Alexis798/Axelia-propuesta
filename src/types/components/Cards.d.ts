export interface ITitleCards {
    text: string;
    icon: OverridableComponent<SvgIconTypeMap>
}

export interface IKpiCards {
    title: string;
    number: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    colorMetric: string;
    colorChip?: string | null;
    chipText?: string
}

export interface IIconCards {
    children: React.ReactNode;
    title: string;
    icon: OverridableComponent<SvgIconTypeMap>
}