import type { Vehicle } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Gauge, Milestone, Wrench } from 'lucide-react';
import { Button } from './ui/button';

type VehicleCardProps = {
  vehicle: Vehicle;
};

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const vehicleImage = PlaceHolderImages.find((img) => img.id === vehicle.images[0].id);
  const primaryCategory = vehicle.categories[0];

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/vehicles/${primaryCategory}/${vehicle.id}`}>
          <div className="relative h-56 w-full">
            {vehicleImage ? (
              <Image
                src={vehicleImage.imageUrl}
                alt={vehicle.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={vehicleImage.imageHint}
              />
            ) : (
              <div className="h-full w-full bg-secondary"></div>
            )}
            <Badge className="absolute top-2 right-2">{vehicle.categoryDisplayName}</Badge>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="mb-2 text-xl font-headline">
          <Link href={`/vehicles/${primaryCategory}/${vehicle.id}`}>
            {vehicle.name}
          </Link>
        </CardTitle>
        <p className="text-2xl font-bold text-primary">
          Ksh{vehicle.price.toLocaleString()}
        </p>
        <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            <span>{vehicle.mileage.toLocaleString()} miles</span>
          </div>
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <Milestone className="h-4 w-4" />
            <span>{vehicle.drivetrain}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
            <Link href={`/vehicles/${primaryCategory}/${vehicle.id}`}>
                View Details
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
