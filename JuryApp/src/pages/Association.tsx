import Breadcrumb from '../components/Breadcrumb';
import userSix from '../images/user/user-04.png';
import DefaultLayout from '../layout/DefaultLayout';
import userQr from '../images/qr/User01CodeQr.png';

const Association = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Association" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        <div className="-mt-22 h-30 w-full max-w-30 rounded-full sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img src={userQr} alt="profile" />
            </div>
          </div>
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img src={userSix} alt="profile" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
               Sywar Ben Njeh 
            </h3>
            <p className="font-medium">Drawing association</p>
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
              <span className="text-sm">Phone</span>
                <span className="font-semibold text-black dark:text-white">
                  25998099
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
              <span className="text-sm">&emsp;&emsp;&emsp;&emsp;</span>
                <span className="font-semibold text-black dark:text-white">
                sywar@gmail.com
                </span>
              </div>
              
            </div>

            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
                Association Description
              </h4>
              <p className="mt-4.5">
              A drawing association is an organization that brings together individuals who share a common interest in drawing. These associations aim to promote the art of drawing.
              </p>
            </div>

            <div className="mt-6.5">
              <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                  Accepted
                </p>
            <br/>
            <br/>
            <br/>
              <div className="flex items-center justify-center gap-3.5">
              <span className="font-semibold text-black dark:text-white">
              Download Documents
                </span>
                <a
                  href="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                        fill=""
                      />
                      <path
                        d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                        fill=""
                      />
                    </svg>
                </a>
                
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Association;
