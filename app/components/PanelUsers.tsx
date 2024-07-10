import Image from 'next/image';
import fork from '../../img/fork.svg'
import star from '../../img/star.svg'
export const PanelUsers = () => {
  const arr = [1, 2, 3, 4, 5];

  return (
    <div className='mr-3'>
      <div className='mb-3 mt-2'>
        <h2>Contributors</h2>
        <div className="flex flex-wrap w-[100px]">
          {arr.slice(0, 4).map((_, index) => (
            <div key={index + 1} className="w-8 h-8 bg-slate-400 rounded-3xl m-1" />
          ))}
          <p>
            {arr.length > 4 ? "+" + (arr.length - 4) : ''}
          </p>
        </div>
      </div>
      <div className='mb-3'>
        <h2 className='mb-2'>Stars</h2>
        <p className='flex items-center'>
          <span>
            <Image className='mr-3' src={star} alt="star" width={16} height={16} />
          </span>
          120 000
        </p>
      </div>
      <div className='mb-3'>
        <h2 className='mb-2'>Forks</h2>
        <p className='flex items-center'>
          <span className='mr-3'>
            <Image src={fork} alt="fork" width={16} height={16} className='mar' />
          </span>
          120 000
        </p>
      </div>
    </div>
  );
};
