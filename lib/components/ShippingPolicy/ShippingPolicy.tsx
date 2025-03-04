import React from 'react';
const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-[#1C1917] text-white px-4 py-12 md:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-center mb-16 pt-12">
          Shipping policy
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed">
          This Shipping Policy outlines our procedures and guidelines for
          shipping products purchased from our online store.
        </p>

        {/* Processing Time Section */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-normal mb-4">
            SECTION 1 - PROCESSING TIME
          </h2>
          <p className="text-gray-300 leading-relaxed">
            All orders are processed within 2-3 business days. Orders are not
            shipped or delivered on weekends or holidays.
          </p>
          <p className="text-gray-300 leading-relaxed">
            If we are experiencing a high volume of orders, shipments may be
            delayed by a few days. Please allow additional days in transit for
            delivery.
          </p>
        </section>

        {/* Shipping Rates Section */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-normal mb-4">
            SECTION 2 - SHIPPING RATES & DELIVERY ESTIMATES
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Shipping charges for your order will be calculated and displayed at
            checkout. We offer the following shipping methods:
          </p>
          <ul className="space-y-4 text-gray-300 list-disc pl-6">
            <li>Standard Shipping (5-7 business days)</li>
            <li>Express Shipping (2-3 business days)</li>
            <li>International Shipping (10-14 business days)</li>
          </ul>
          <p className="text-gray-300 leading-relaxed">
            You will receive a shipping confirmation email once your order has
            shipped containing your tracking number(s).
          </p>
        </section>

        {/* International Shipping Section */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-normal mb-4">
            SECTION 3 - INTERNATIONAL SHIPPING
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We offer international shipping to select countries. Please note
            that international orders may be subject to import duties and taxes
            upon arrival. These fees are the responsibility of the recipient.
          </p>
          <p className="text-gray-300 leading-relaxed">
            International shipping times may vary depending on customs
            processing in your country.
          </p>
        </section>

        {/* Lost/Missing Packages Section */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-normal mb-4">
            SECTION 4 - LOST/MISSING PACKAGES
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We are not responsible for lost or stolen packages confirmed to be
            delivered to the address provided. If your tracking information
            shows your package was delivered but you haven&apos;t received it,
            please contact your local post office.
          </p>
          <p className="text-gray-300 leading-relaxed">
            For packages lost in transit, please contact us within 30 days of
            the estimated delivery date.
          </p>
        </section>

        {/* Damages Section */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-normal mb-4">
            SECTION 5 - DAMAGES
          </h2>
          <p className="text-gray-300 leading-relaxed">
            If your package arrives damaged, please take photos and contact us
            immediately. We will work with you to resolve the situation and
            provide a replacement if necessary.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Please save all packaging materials and damaged items until the
            claim process is complete.
          </p>
        </section>

        {/* Changes Section */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-normal mb-4">
            SECTION 6 - CHANGES TO SHIPPING POLICY
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We reserve the right to modify our shipping policy at any time
            without prior notice. Changes will be posted on this page and will
            be effective immediately upon posting.
          </p>
        </section>

        {/* Contact Section */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-normal mb-4">CONTACT</h2>
          <p className="text-gray-300 leading-relaxed">
            If you have any questions about our shipping policy, please contact
            our customer service team at support@example.com or call us at (555)
            123-4567.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
