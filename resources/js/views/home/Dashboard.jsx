import React from 'react'
import { ChatIcon, ShoppingCartIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/solid'

import InfoCard from '../../components/Cards/InfoCard'
import RoundIcon from '../../components/RoundIcon'

function Dashboard() {
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <InfoCard title="Total clients" value="6389">
        <RoundIcon icon={UserGroupIcon} iconColorClass="text-orange-500 dark:text-orange-100" bgColorClass="bg-orange-100 dark:bg-orange-500" className="mr-4" />
      </InfoCard>

      <InfoCard title="Account balance" value="$ 46,760.89">
        <RoundIcon icon={CurrencyDollarIcon} iconColorClass="text-green-500 dark:text-green-100" bgColorClass="bg-green-100 dark:bg-green-500" className="mr-4" />
      </InfoCard>

      <InfoCard title="New sales" value="376">
        <RoundIcon icon={ShoppingCartIcon} iconColorClass="text-blue-500 dark:text-blue-100" bgColorClass="bg-blue-100 dark:bg-blue-500" className="mr-4" />
      </InfoCard>

      <InfoCard title="Pending contacts" value="35">
        <RoundIcon icon={ChatIcon} iconColorClass="text-teal-500 dark:text-teal-100" bgColorClass="bg-teal-100 dark:bg-teal-500" className="mr-4" />
      </InfoCard>
    </div>
  )
}

export default Dashboard
