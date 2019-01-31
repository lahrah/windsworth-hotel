
export class PayStackOptions {
    key: string;
    email: string;
    amount: number;
    currency: string;
    metadata: MetaData;
    callback: (res) => void ;
    onClose:  () => void;

}

export class MetaData {
    custom_fields: Fields;
}

export class Fields {
    display_name: string;
    variable_name: string;
    value: string;
}
