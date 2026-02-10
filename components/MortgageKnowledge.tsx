import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, HelpCircle, Coins, TrendingDown, AlertTriangle, ShieldCheck } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, icon, children, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-3 bg-white transition-all duration-200 hover:shadow-sm">
      <button
        className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
            {icon}
          </div>
          <span className={`font-bold ${isOpen ? 'text-blue-800' : 'text-gray-700'}`}>{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      
      {isOpen && (
        <div className="p-4 pt-0 text-sm text-gray-600 leading-relaxed bg-white border-t border-gray-100">
          <div className="pt-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export const MortgageKnowledge: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open the first item

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
        房貸小教室
      </h2>
      
      <div className="space-y-1">
        
        {/* Item 1: New Youth Housing Loan */}
        <AccordionItem
          title="新青安房貸懶人包 (2023-2026)"
          icon={<Coins className="w-5 h-5" />}
          isOpen={openIndex === 0}
          onClick={() => toggleItem(0)}
        >
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold text-gray-800">貸款額度：</span>最高 1,000 萬元。</li>
            <li><span className="font-bold text-gray-800">貸款年限：</span>最長可達 40 年 (減輕每月負擔)。</li>
            <li><span className="font-bold text-gray-800">寬限期：</span>最長 5 年 (期間只繳息不還本)。</li>
            <li><span className="font-bold text-gray-800">利率優惠：</span>政府補貼後，目前地板利率約為 1.775% (實際依銀行公告為準)。</li>
            <li className="text-amber-600 bg-amber-50 p-2 rounded mt-2">
              注意：新青安專案目前預計實施至 2026 年 7 月 31 日，且必須符合「本人、配偶及未成年子女均無自有住宅」之資格。
            </li>
          </ul>
        </AccordionItem>

        {/* Item 2: Repayment Methods */}
        <AccordionItem
          title="「本息攤還」vs「本金攤還」差在哪？"
          icon={<HelpCircle className="w-5 h-5" />}
          isOpen={openIndex === 1}
          onClick={() => toggleItem(1)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-2">本息平均攤還 (最常見)</h4>
              <p className="mb-2">每月繳款金額固定 (本金+利息)，適合收入固定的上班族，方便理財規劃。</p>
              <p className="text-xs text-gray-500">缺點：總利息支出較多，還本速度較慢。</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
              <h4 className="font-bold text-green-800 mb-2">本金平均攤還 (省利息)</h4>
              <p className="mb-2">每月償還固定的本金，利息隨餘額減少。前期繳款金額最高，之後逐月遞減。</p>
              <p className="text-xs text-gray-500">優點：總利息支出最少，還款速度快。</p>
            </div>
          </div>
        </AccordionItem>

        {/* Item 3: Grace Period */}
        <AccordionItem
          title="我應該使用寬限期嗎？"
          icon={<AlertTriangle className="w-5 h-5" />}
          isOpen={openIndex === 2}
          onClick={() => toggleItem(2)}
        >
          <p className="mb-3">寬限期是指「只繳利息，不還本金」的期間。雖然前期輕鬆，但有「先甘後苦」的特性。</p>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mr-2 mt-1">適合族群</span>
              <span>首購族前期裝潢開銷大、預期未來幾年收入會大幅成長者、短期投資客。</span>
            </div>
            <div className="flex items-start">
              <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded mr-2 mt-1">風險警示</span>
              <span>寬限期結束後，必須在剩餘年限內還完所有本金，導致<span className="font-bold text-red-600">月付金可能暴增 2~3 倍</span>。若收入未跟上，可能面臨繳不出房貸的窘境。</span>
            </div>
          </div>
        </AccordionItem>

        {/* Item 4: Affordability */}
        <AccordionItem
          title="房貸負擔率怎麼算才安全？"
          icon={<TrendingDown className="w-5 h-5" />}
          isOpen={openIndex === 3}
          onClick={() => toggleItem(3)}
        >
          <p className="mb-4">銀行在審核房貸時，通常會計算您的「收支比」。</p>
          <ul className="list-decimal pl-5 space-y-2">
            <li>
              <span className="font-bold text-gray-800">舒適線 (房貸 &lt; 月收 30%)：</span>
              生活品質不受影響，仍有餘裕儲蓄或投資。
            </li>
            <li>
              <span className="font-bold text-gray-800">緊繃線 (房貸 ≈ 月收 33%~40%)：</span>
              多數雙薪家庭的現況，需嚴格控管其他開銷。
            </li>
            <li>
              <span className="font-bold text-gray-800">危險線 (房貸 &gt; 月收 50%)：</span>
              銀行極可能拒貸，且一旦升息或失業，將立即面臨斷頭風險。
            </li>
          </ul>
        </AccordionItem>

        {/* Item 5: Advanced Concepts */}
        <AccordionItem
          title="常見問答：成數、信用與轉貸"
          icon={<ShieldCheck className="w-5 h-5" />}
          isOpen={openIndex === 4}
          onClick={() => toggleItem(4)}
        >
          <div className="space-y-5">
            <div>
                <h4 className="font-bold text-gray-800 mb-1 flex items-center">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">Q</span>
                    我能貸到幾成 (LTV)？
                </h4>
                <p className="text-gray-600 pl-7">
                    一般首購族最高可貸 8 成 (LTV 80%)。影響成數的關鍵在於「房屋鑑價」與「個人信用」。若位於精華區 (蛋黃區)、屋齡新，鑑價通常較高；若為套房、偏遠地區或老屋，銀行核貸成數可能降至 6~7 成。
                </p>
            </div>
            
            <div className="border-t border-gray-100 pt-4">
                <h4 className="font-bold text-gray-800 mb-1 flex items-center">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">Q</span>
                    信用評分 (聯徵) 多重要？
                </h4>
                <p className="text-gray-600 pl-7">
                    銀行會調閱聯徵中心紀錄。建議保持信用卡全額繳清、不使用循環利息。完全沒辦過信用卡的「信用小白」因為無紀錄可查，反而較難核貸，建議儘早申辦信用卡並正常繳款累積信用。
                </p>
            </div>

            <div className="border-t border-gray-100 pt-4">
                <h4 className="font-bold text-gray-800 mb-1 flex items-center">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">Q</span>
                    轉貸划算嗎？有什麼隱藏成本？
                </h4>
                <p className="text-gray-600 pl-7">
                    將房貸搬到另一家銀行通常是為了爭取更低利率或重新取得寬限期。但轉貸有成本：
                    <ul className="list-disc pl-5 mt-1 text-xs space-y-1">
                        <li><span className="font-medium">原銀行違約金：</span>若還在綁約期內 (通常3年)。</li>
                        <li><span className="font-medium">新銀行手續費：</span>約 3,000 ~ 6,000 元。</li>
                        <li><span className="font-medium">地政設定與代書費：</span>約 6,000 ~ 15,000 元。</li>
                    </ul>
                    <span className="block mt-2 text-blue-600 font-medium">💡 經驗法則：若利率降幅未達 0.3% (3碼) 以上，轉貸未必划算。</span>
                </p>
            </div>
          </div>
        </AccordionItem>

      </div>
    </div>
  );
};