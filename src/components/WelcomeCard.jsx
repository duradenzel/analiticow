import {
    Card,
    CardContent,
    
    CardTitle,
  } from "@/components/ui/card"

const WelcomeCard = () => {
  return (
    <Card className={"w-full bg-gray-50 rounded-sm"}>
    <CardTitle>Welkom!</CardTitle>

    <CardContent>
        <p>U gebruikt momenteel een Beta versie van de applicatie. Mocht u fouten tegenkomen horen wij dit graag. Bedankt voor uw begrip.</p>
    </CardContent>

</Card>
  )
}

export default WelcomeCard