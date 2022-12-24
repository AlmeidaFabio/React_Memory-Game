import * as Styles from './styles'

type Props = {
    label:string;
    icon?:any;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export function Button({label, icon, onClick}:Props) {
    return(
        <Styles.Constainer onClick={onClick}>
            {icon && 
                <Styles.IconArea>
                    <Styles.Icon src={icon}/>
                </Styles.IconArea>
            }
            <Styles.Label>{label}</Styles.Label>
        </Styles.Constainer>
    )
}