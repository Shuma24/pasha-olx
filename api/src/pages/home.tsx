import { UiFormPageLayout, UiHeader } from '../shared/ui';
import { HeaderProfile } from '../widgets';

export const HomePage = () => {
  return (
    <div className={`min-h-screen flex flex-col bg-slate-100`}>
      <UiHeader right={<HeaderProfile />} />
      <div className='grid grid-cols-[200px_1fr]'>
        <aside className='px-5 pt-10'>
          <button>test</button>
        </aside>
        <main className='pt-10 px-5'>
          <h1 className='text-2xl mb-8'>
            <UiFormPageLayout title='Створити замовлення' />
          </h1>
        </main>
      </div>
    </div>
  );
};
