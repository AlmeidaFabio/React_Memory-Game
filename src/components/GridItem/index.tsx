import { IGrid } from '../../types/IGrid'
import * as Styles from './styles'
import b7web from '../../svgs/b7.svg'
import { items } from '../../data/items';

type Props = {
    item:IGrid;
    onClick:() => void;
}

export function GridItem({item, onClick}: Props) {
    return(
        <Styles.Container onClick={onClick} showBackground={item.permanentShow || item.show}>
            {item.permanentShow === false && item.show === false && 
                <Styles.Icon src={b7web} opacity={.1}/>
            }
            {(item.permanentShow || item.show) && item.item !== null && 
                <Styles.Icon src={items[item.item].icon} />
            }
        </Styles.Container>
    )
}