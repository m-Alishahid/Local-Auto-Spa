import React from "react";
import { additionalServices } from "@/utils/services";

interface SelectedService {
  serviceType: string;
  package: string;
}

interface OrderSummaryProps {
  selectedServices: SelectedService[];
  additionalServicesIds: string[];
  getServiceTypeDetails: (id: string) => { name: string } | undefined;
  getPackageDetails: (
    serviceType: string,
    packageId: string
  ) => { name: string; price: string } | undefined;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedServices,
  additionalServicesIds,
  getServiceTypeDetails,
  getPackageDetails,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-decent-blue mb-3">
        Order Summary
      </h3>

      <div className="space-y-2">
        {/* Selected Service Packages */}
        {selectedServices.length > 0 ? (
          selectedServices.map((service, id) => {
            const serviceInfo = getServiceTypeDetails(service.serviceType);
            const packageInfo = getPackageDetails(
              service.serviceType,
              service.package
            );

            return (
              <div key={id} className="flex justify-between">
                <span>
                  {serviceInfo?.name} - {packageInfo?.name}
                </span>
                <span className="font-medium">{packageInfo?.price}</span>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No services selected yet.</p>
        )}

        {/* Add-ons */}
        {additionalServicesIds.length > 0 && (
          <>
            <div className="border-t border-gray-200 my-2"></div>
            {additionalServicesIds.map((serviceId, id) => {
              const service = additionalServices.find((s) => s.id === serviceId);
              return (
                <div key={id} className="flex justify-between">
                  <span>{service?.name}</span>
                  <span className="font-medium">{service?.price}</span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
