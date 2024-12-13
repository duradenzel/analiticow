import {
    Card,
    CardContent,
    
    CardTitle,
  } from "@/components/ui/card"

const WelcomeCard = () => {
  return (
    <Card className={"w-5/6 lg:w-1/2 bg-gray-50 rounded-sm"}>
    <CardTitle>
        <div className="flex mx-5">
        <p>Welkom!</p>
        <span className="h-2 w-2 bg-gray-50 rounded-md">X</span>
        </div>
      </CardTitle>

    <CardContent>
        <p>U gebruikt momenteel een Beta versie van de applicatie. Mocht u fouten tegenkomen horen wij dit graag. Bedankt voor uw begrip.</p>
    </CardContent>

</Card>
  )
}

export default WelcomeCard