import { useEffect, useState } from 'react'
import * as Styles from './App.styles'
import Logo from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'
import { Button } from './components/Button'
import { InfoItem } from './components/InfoItem'
import { IGrid } from './types/IGrid'
import { items } from './data/items'
import { GridItem } from './components/GridItem'
import { formatTimerElapsed } from './helpers/formatTimeElapsed'

export default function App() {
  const [playng, setPlayng] = useState<boolean>(false)
  const [timeElapsed, setTimelapsed] = useState<number>(0)
  const [moveCount, setTMoveCount] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<IGrid[]>([])

  useEffect(() => {
    ResetAndCreateGrid()
  },[])

  useEffect(() => {
    const timer = setInterval(() => {
      if(playng) {
        setTimelapsed(timeElapsed + 1)
      }
    },1000)

    return () => clearInterval(timer)
  }, [playng, timeElapsed])

  useEffect(() => {
    //verificando se as cartas abertas são iguais
    if(shownCount === 2) {
      let opened = gridItems.filter(item => item.show === true);

      if(opened.length === 2) {
        if(opened[0].item === opened[1].item) { 
          let tmpGrid = [...gridItems];  

          for(let i in tmpGrid) {
            if(tmpGrid[i].show) {
              tmpGrid[i].permanentShow = true;
              tmpGrid[i].show = false;
            }
          }
          setGridItems(tmpGrid)
          setShownCount(0)
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItems];

            for(let i in tmpGrid) {
              tmpGrid[i].show = false;
            }
            setGridItems(tmpGrid)
            setShownCount(0)
          },1000)
        }
        
        setTMoveCount(moveCount + 1)
      }
    }
  },[shownCount, gridItems])

  useEffect(() => {
    //verificando se o jogo acabou
    if(moveCount > 0 && gridItems.every(item => item.permanentShow === true)) {
      setPlayng(false)
    }
  },[moveCount, gridItems])

  function ResetAndCreateGrid() {
    //resetar o jogo
    setTimelapsed(0)
    setShownCount(0)
    setTMoveCount(0)
    //criar o grid e iniciar o jogo
    //criar um grid vazio
    let tmpGrid: IGrid[] = [];

    for(let i = 0; i < (items.length * 2); i++) {
      tmpGrid.push({
        item:null,
        show:false,
        permanentShow:false
      })
    }
    //preencher o grid
    for(let w = 0; w < 2; w++) {
      for(let i = 0; i < items.length; i++) {
        let pos = -1;
        while(pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        
        tmpGrid[pos].item = i;
      }
    }
    
    setGridItems(tmpGrid)
    setPlayng(true)
  }

  function handleItemClick(index:number) {
    if(playng && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];

      if(tmpGrid[index].permanentShow === false && tmpGrid[index].show === false) {
        tmpGrid[index].show = true;
        setShownCount(shownCount + 1);
      }
      setGridItems(tmpGrid)
    }
  }

  return(
    <Styles.Container>
      <Styles.Info>
        <Styles.LogoLink href=''>
          <img src={Logo} alt="" width={200}/>
        </Styles.LogoLink>
        <Styles.InfoArea>
          <InfoItem label="Tempo" value={formatTimerElapsed(timeElapsed)}/>
          <InfoItem label="Movimentos" value={moveCount.toString()}/>
        </Styles.InfoArea>
        <Button label='Reiniciar' icon={RestartIcon} onClick={ResetAndCreateGrid}/>
      </Styles.Info>
      <Styles.GridArea>
        <Styles.Grid>
          {gridItems.map((item, index) => (
            <GridItem key={index} item={item} onClick={() => handleItemClick(index)}/>
          ))}
        </Styles.Grid>
      </Styles.GridArea>
    </Styles.Container>
  )
}