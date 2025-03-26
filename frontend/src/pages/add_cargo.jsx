import React, { useState } from 'react';

function AddCargoRequest() {
  const [showSecondLoading, setShowSecondLoading] = useState(false);
  const [showSecondUnloading, setShowSecondUnloading] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [showExtraModal, setShowExtraModal] = useState(false);

  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">Add Cargo Request</h1>
        <p>Please specify the loading/unloading details, cargo parameters, and contact information</p>
        <div
          className="heading-line"
          style={{ borderBottom: '3px solid #57cc99', width: '60px', margin: '0.5rem auto 1.5rem' }}
        ></div>
      </div>

      <form method="POST">
        {/* Section 1: Dates */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">1. Dates</h5>
          </div>
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label htmlFor="dateFrom" className="form-label">Loading From</label>
                <input type="date" className="form-control" id="dateFrom" defaultValue="2025-03-22" />
              </div>
              <div className="col-md-3">
                <label htmlFor="dateTo" className="form-label">Loading Until</label>
                <input type="date" className="form-control" id="dateTo" defaultValue="2025-03-22" />
              </div>
              <div className="col-md-6">
                <label className="form-label d-block">Unloading (approx.)</label>
                <small className="text-muted">
                  Set the same dates if you only have a single loading date range.
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Loading / Unloading Cities */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">2. Loading / Unloading</h5>
          </div>
          <div className="card-body">
            {/* Primary Loading City */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="loadingCityPrimary" className="form-label">Primary Loading City</label>
                <input type="text" className="form-control" id="loadingCityPrimary" placeholder="e.g. Zurich" />
              </div>
              <div className="col-md-6">
                <label htmlFor="loadingPostalPrimary" className="form-label">Postal Code</label>
                <input type="text" className="form-control" id="loadingPostalPrimary" placeholder="e.g. 8000" />
              </div>
            </div>

            {/* Secondary Loading City */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkSecondLoadingCity"
                onChange={(e) => setShowSecondLoading(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="checkSecondLoadingCity">
                Add second loading city
              </label>
            </div>
            {showSecondLoading && (
              <div id="secondLoadingCityContainer">
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="loadingCitySecondary" className="form-label">Second Loading City</label>
                    <input type="text" className="form-control" id="loadingCitySecondary" placeholder="e.g. Bern" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="loadingPostalSecondary" className="form-label">Postal Code</label>
                    <input type="text" className="form-control" id="loadingPostalSecondary" placeholder="e.g. 3000" />
                  </div>
                </div>
              </div>
            )}
            <hr />

            {/* Primary Unloading City */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="unloadingCityPrimary" className="form-label">Primary Unloading City</label>
                <input type="text" className="form-control" id="unloadingCityPrimary" placeholder="e.g. Lugano" />
              </div>
              <div className="col-md-6">
                <label htmlFor="unloadingPostalPrimary" className="form-label">Postal Code</label>
                <input type="text" className="form-control" id="unloadingPostalPrimary" placeholder="e.g. 6900" />
              </div>
            </div>

            {/* Secondary Unloading City */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkSecondUnloadingCity"
                onChange={(e) => setShowSecondUnloading(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="checkSecondUnloadingCity">
                Add second unloading city
              </label>
            </div>
            {showSecondUnloading && (
              <div id="secondUnloadingCityContainer">
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="unloadingCitySecondary" className="form-label">Second Unloading City</label>
                    <input type="text" className="form-control" id="unloadingCitySecondary" placeholder="e.g. Geneva" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="unloadingPostalSecondary" className="form-label">Postal Code</label>
                    <input type="text" className="form-control" id="unloadingPostalSecondary" placeholder="e.g. 1201" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Cargo Details */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">3. Cargo Details</h5>
          </div>
          <div className="card-body">
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="cargoType" className="form-label">Cargo Type</label>
                <input type="text" className="form-control" id="cargoType" placeholder="e.g. Pallets, Equipment" />
              </div>
              <div className="col-md-3">
                <label htmlFor="cargoWeight" className="form-label">Weight (tons)</label>
                <input type="text" className="form-control" id="cargoWeight" placeholder="e.g. 1.5" />
              </div>
              <div className="col-md-3">
                <label htmlFor="cargoVolume" className="form-label">Volume (m³)</label>
                <input type="text" className="form-control" id="cargoVolume" placeholder="e.g. 5" />
              </div>
            </div>

            {/* Additional Loading Options */}
            <div className="mb-3">
              <div className="d-flex flex-wrap">
                <div className="form-check me-3">
                  <input type="checkbox" className="form-check-input" id="noAdditionalLoading" />
                  <label className="form-check-label" htmlFor="noAdditionalLoading">
                    No Additional Loading (separate truck)
                  </label>
                </div>
                <div className="form-check me-3">
                  <input type="checkbox" className="form-check-input" id="additionalLoading" />
                  <label className="form-check-label" htmlFor="additionalLoading">
                    Additional Loading
                  </label>
                </div>
                <div className="form-check me-3">
                  <input type="checkbox" className="form-check-input" id="possibleExtraLoading" />
                  <label className="form-check-label" htmlFor="possibleExtraLoading">
                    Possible Extra Loading
                  </label>
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div className="form-check mb-2">
              <input type="checkbox" className="form-check-input" id="specifyDimensions"
                onChange={(e) => setShowDimensions(e.target.checked)} />
              <label className="form-check-label" htmlFor="specifyDimensions">
                Specify Cargo Dimensions (in meters)
              </label>
            </div>
            {showDimensions && (
              <div id="dimensionsContainer">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label htmlFor="cargoLength" className="form-label">Length</label>
                    <input type="text" className="form-control" id="cargoLength" placeholder="e.g. 10" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="cargoWidth" className="form-label">Width</label>
                    <input type="text" className="form-control" id="cargoWidth" placeholder="e.g. 2.5" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="cargoHeight" className="form-label">Height</label>
                    <input type="text" className="form-control" id="cargoHeight" placeholder="e.g. 3" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Transport & Price */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">4. Transport & Price</h5>
          </div>
          <div className="card-body">
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="transportType" className="form-label">Transport Type</label>
                <select id="transportType" className="form-select">
                  <option value="0" selected>Not Specified</option>
                  <option value="11">Tarp</option>
                  <option value="21">Closed</option>
                  <option value="4">Isothermal</option>
                  <option value="19">All-Metal</option>
                  <option value="10">Refrigerator</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="truckCount" className="form-label">Number of Trucks</label>
                <input type="text" className="form-control" id="truckCount" placeholder="e.g. 1" />
              </div>
            </div>

            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label htmlFor="price" className="form-label fw-bold">Price</label>
                <input type="text" className="form-control" id="price" placeholder="e.g. 1000" />
              </div>
              <div className="col-md-3">
                <label htmlFor="priceCurrency" className="form-label">Currency</label>
                <select id="priceCurrency" className="form-select">
                  <option value="0" selected>Not Specified</option>
                  <option value="1">UAH</option>
                  <option value="3">EUR</option>
                  <option value="2">USD</option>
                  <option value="93">CHF</option>
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="pricePerUnit" className="form-label">Per Unit</label>
                <select id="pricePerUnit" className="form-select">
                  <option value="0" selected>Total</option>
                  <option value="-2">Per Kilometer</option>
                  <option value="-1">Per Ton</option>
                </select>
              </div>
              <div className="col-md-3">
                <a href="#" className="text-decoration-underline" onClick={() => alert('Show additional payment details form')}>
                  + Add Payment Details
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Contact Information */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">5. Contact Information</h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">Email</label>
                <div className="d-flex">
                  <input type="email" className="form-control" placeholder="e.g. example@domain.com" />
                  <a href="#" className="ms-2 align-self-center text-decoration-underline" onClick={() => alert('Add new email modal')}>
                    Add
                  </a>
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Skype</label>
                <div className="d-flex">
                  <input type="text" className="form-control" placeholder="e.g. skype_id" />
                  <a href="#" className="ms-2 align-self-center text-decoration-underline" onClick={() => alert('Add new Skype modal')}>
                    Add
                  </a>
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Viber / WhatsApp</label>
                <div className="d-flex">
                  <input type="tel" className="form-control" placeholder="e.g. +41 123 4567" />
                  <a href="#" className="ms-2 align-self-center text-decoration-underline" onClick={() => alert('Add phone modal')}>
                    Add
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Additional Info & Extra Modal Trigger */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">6. Additional Info</h5>
          </div>
          <div className="card-body">
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="humanitarianAid" />
              <label className="form-check-label" htmlFor="humanitarianAid">
                This cargo is humanitarian aid for refugees and victims of war, hunger, and natural disasters
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Extra Information</label>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={() => setShowExtraModal(true)}
                >
                  Add Extra Info
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit & Home Buttons */}
        <div className="text-center mb-5">
          <button type="submit" className="btn btn-main px-5 py-2">
            Submit Request
          </button>
          <button
            type="button"
            className="btn btn-secondary px-5 py-2 ms-3"
            onClick={() => window.location.href = '/'}
          >
            Home
          </button>
        </div>
      </form>

      {/* Extra Info Modal */}
      {showExtraModal && (
        <div className="modal show fade" style={{ display: 'block' }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Additional Information</h5>
                <button type="button" className="btn-close" onClick={() => setShowExtraModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  {/* Documents */}
                  <div className="col-md-3">
                    <h6 className="fw-bold">Documents</h6>
                    <hr />
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="tir" />
                      <label className="form-check-label" htmlFor="tir">TIR</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="cmr" />
                      <label className="form-check-label" htmlFor="cmr">CMR</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="adr" />
                      <label className="form-check-label" htmlFor="adr">ADR</label>
                    </div>
                  </div>

                  {/* Loading */}
                  <div className="col-md-3">
                    <h6 className="fw-bold">Loading</h6>
                    <hr />
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="topLoading" />
                      <label className="form-check-label" htmlFor="topLoading">Top</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="sideLoading" />
                      <label className="form-check-label" htmlFor="sideLoading">Side</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="backLoading" />
                      <label className="form-check-label" htmlFor="backLoading">Back</label>
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="col-md-3">
                    <h6 className="fw-bold">Conditions</h6>
                    <hr />
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="fragile" />
                      <label className="form-check-label" htmlFor="fragile">Fragile</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="temperature" />
                      <label className="form-check-label" htmlFor="temperature">Temperature Controlled</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="express" />
                      <label className="form-check-label" htmlFor="express">Express</label>
                    </div>
                  </div>

                  {/* Extra */}
                  <div className="col-md-3">
                    <h6 className="fw-bold">Extra</h6>
                    <hr />
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="insurance" />
                      <label className="form-check-label" htmlFor="insurance">Insurance</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="customClearance" />
                      <label className="form-check-label" htmlFor="customClearance">Custom Clearance</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="doorDelivery" />
                      <label className="form-check-label" htmlFor="doorDelivery">Door Delivery</label>
                    </div>
                  </div>
                </div>
                
                <hr className="my-4" />

                <div className="mb-3">
                  <label htmlFor="comment" className="form-label fw-bold">Comment</label>
                  <textarea className="form-control" id="comment" rows="2" placeholder="Provide any additional info"></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="additionalInfo" className="form-label fw-bold">Additional Info</label>
                  <textarea className="form-control" id="additionalInfo" rows="3" placeholder="Describe any special conditions, if any"></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowExtraModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-main" onClick={() => setShowExtraModal(false)}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCargoRequest;
