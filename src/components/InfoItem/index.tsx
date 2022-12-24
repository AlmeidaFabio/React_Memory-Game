import * as Styles from './styles'

type Props = {
    label:string;
    value:string;
}

export function InfoItem({label, value}: Props) {
    return(
        <Styles.Container>
            <Styles.Label>{label}</Styles.Label>
            <Styles.Value>{value}</Styles.Value>
        </Styles.Container>
    )
}