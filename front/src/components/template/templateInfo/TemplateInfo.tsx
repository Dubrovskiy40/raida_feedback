import React from "react"

import style from "./templateInfo.module.css"
import {ITemplateInfo} from "../../../store/types"


const TemplateInfo: React.FC<ITemplateInfo> = ({ templateNumber }) => {

    const tempInfo = [
        {id: 1, title: 'Опрос CSAT', subtitle: 'Измеряйте удовлетворенность клиентов конкретным опытом. Определите области для улучшения для конкретной ценности, которую вы предоставляете.'},
        {id: 2, title: 'Опрос CES', subtitle: 'Измерьте простоту взаимодействия с пользователем при конкретном взаимодействии с вашим продуктом. CES опрос используется для получения быстрой и целенаправленной обратной связи.'},
        {id: 3, title: 'Опрос NPS', subtitle: 'Измеряйте долгосрочную удовлетворенность и лояльность клиентов, получая надежный индикатор роста и производительности продукта.'},
    ]

    return (
        <div className={style.templateInfo}>
            {
                tempInfo.filter(item => item.id === templateNumber).map(item => (
                    <div key={item.id}>
                        <h2 className={style.templateInfo__title}>{item.title}</h2>
                        <p className={style.templateInfo__subtitle}>{item.subtitle}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default React.memo(TemplateInfo)
