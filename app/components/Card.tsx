import React from "react"

interface CardProp {
  subtitle: string,
  text: string,
  appointed: string,
}

type CardProps = {
  cards: CardProp[],
}

export const Card: React.FC<CardProps> = ({ cards }) => {
  return (
    <>
      {cards.map((card, index) => (
        <div key={index + 1} className="bg-white mb-4 p-2 shadow-lg shadow-slate-400">
          <h2 >{card.subtitle}</h2>
          <p className="text-sm text-gray-500">{card.text}</p>
          <div className="flex items-center mt-3">
            <div key={index} className="w-8 h-8 bg-slate-400 rounded-3xl  mr-2" />
            <p className="text-sm">{card.appointed}</p>
          </div>
        </div>
      ))}
    </>
  )
}

