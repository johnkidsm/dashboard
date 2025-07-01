"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertTriangle,
  Flame,
  Zap,
  Clock,
  TrendingUp,
  Wind,
  Droplets,
  Thermometer,
  Factory,
  Sun,
  Fuel,
  Shield,
  Activity,
  CheckCircle,
  MapPin,
  Layers,
  Phone,
  Truck,
  Radio,
  FileText,
  Send,
  Menu,
  X,
  Home,
  Bell,
  Building,
  Leaf,
  BarChart3,
} from "lucide-react"

// Enhanced mock data with coordinates for mapping
const mockAlerts = [
  {
    id: 1,
    type: "wildfire",
    severity: "HIGH",
    location: "Transmission Line T-401, BC",
    sector: "electricity",
    distance: "2.3 km",
    confidence: 87,
    timeDetected: "2024-01-15 14:23",
    estimatedImpact: "Potential outage affecting 45,000 customers",
    recommendedActions: ["Deploy fire suppression", "Prepare backup power routing", "Alert emergency services"],
    coordinates: { lat: 49.2827, lng: -123.1207 }, // Vancouver area
    details: {
      fireSize: "150 hectares",
      windSpeed: "25 km/h",
      humidity: "15%",
      temperature: "32°C",
      growthRate: "High",
      containment: "0%",
      resourcesDeployed: "2 helicopters, 15 ground crew",
      estimatedContainment: "48-72 hours",
    },
    responseProtocol: {
      emergencyContacts: [
        { role: "Fire Chief", name: "Sarah Mitchell", phone: "+1-604-555-0123" },
        { role: "Grid Operations", name: "Mike Chen", phone: "+1-604-555-0456" },
        { role: "Emergency Coordinator", name: "Lisa Thompson", phone: "+1-604-555-0789" },
      ],
      resources: [
        { type: "Fire Suppression", units: "3 helicopters, 25 ground crew", eta: "15 minutes" },
        { type: "Power Rerouting", units: "Mobile substation", eta: "45 minutes" },
        { type: "Evacuation Support", units: "2 buses, 4 emergency vehicles", eta: "20 minutes" },
      ],
      procedures: [
        "Activate emergency operations center",
        "Deploy aerial fire suppression",
        "Implement power grid contingency plan",
        "Coordinate with local emergency services",
        "Establish evacuation perimeter if needed",
      ],
    },
  },
  {
    id: 2,
    type: "air_quality",
    severity: "MEDIUM",
    location: "Refinery R-105, AB",
    sector: "oil_gas",
    distance: "0.5 km",
    confidence: 92,
    timeDetected: "2024-01-15 13:45",
    estimatedImpact: "AQI exceeding regulatory limits - potential shutdown required",
    recommendedActions: ["Reduce emissions", "Notify regulators", "Implement contingency plan"],
    coordinates: { lat: 53.5461, lng: -113.4938 }, // Edmonton area
    details: {
      currentAQI: 165,
      pollutant: "PM2.5",
      regulatoryLimit: 150,
      exceedanceLevel: "10%",
      windDirection: "Southwest",
      affectedArea: "5 km radius",
      populationImpact: "12,000 residents",
      estimatedDuration: "6-8 hours",
    },
    responseProtocol: {
      emergencyContacts: [
        { role: "Environmental Manager", name: "David Rodriguez", phone: "+1-780-555-0234" },
        { role: "Regulatory Liaison", name: "Emma Wilson", phone: "+1-780-555-0567" },
        { role: "Operations Manager", name: "James Park", phone: "+1-780-555-0890" },
      ],
      resources: [
        { type: "Emission Control", units: "Mobile air filtration units", eta: "30 minutes" },
        { type: "Monitoring Team", units: "Environmental specialists", eta: "20 minutes" },
        { type: "Public Health", units: "Health advisory team", eta: "45 minutes" },
      ],
      procedures: [
        "Reduce refinery operations to minimum safe levels",
        "Deploy additional air quality monitors",
        "Issue public health advisory",
        "Notify Alberta Environment and Protected Areas",
        "Implement emission reduction protocols",
      ],
    },
  },
  {
    id: 3,
    type: "water_quality",
    severity: "HIGH",
    location: "Hydro Dam H-203, QC",
    sector: "renewable",
    distance: "0.1 km",
    confidence: 78,
    timeDetected: "2024-01-15 12:30",
    estimatedImpact: "Contamination detected - environmental compliance issue",
    recommendedActions: ["Stop discharge", "Investigate source", "Report to authorities"],
    coordinates: { lat: 45.5017, lng: -73.5673 }, // Montreal area
    details: {
      contaminant: "Heavy metals",
      concentrationLevel: "2.5x normal",
      affectedVolume: "50,000 liters",
      downstreamImpact: "15 km",
      wildlifeRisk: "High",
      drinkingWaterRisk: "Medium",
      cleanupTime: "2-3 weeks",
      estimatedCost: "$450,000",
    },
    responseProtocol: {
      emergencyContacts: [
        { role: "Dam Operations", name: "Marie Dubois", phone: "+1-514-555-0345" },
        { role: "Environmental Officer", name: "Pierre Laval", phone: "+1-514-555-0678" },
        { role: "Emergency Response", name: "Sophie Martin", phone: "+1-514-555-0901" },
      ],
      resources: [
        { type: "Water Treatment", units: "Mobile treatment facility", eta: "60 minutes" },
        { type: "Containment", units: "Boom deployment team", eta: "25 minutes" },
        { type: "Sampling Team", units: "Water quality specialists", eta: "30 minutes" },
      ],
      procedures: [
        "Immediately halt all water discharge",
        "Deploy containment booms downstream",
        "Begin emergency water quality sampling",
        "Notify Quebec Ministry of Environment",
        "Activate water treatment protocols",
      ],
    },
  },
  {
    id: 4,
    type: "extreme_weather",
    severity: "MEDIUM",
    location: "Wind Farm W-301, SK",
    sector: "renewable",
    distance: "5.2 km",
    confidence: 85,
    timeDetected: "2024-01-15 11:15",
    estimatedImpact: "High winds may require turbine shutdown",
    recommendedActions: ["Monitor wind speeds", "Prepare for shutdown", "Secure equipment"],
    coordinates: { lat: 52.1579, lng: -106.6702 }, // Saskatoon area
    details: {
      currentWindSpeed: "65 km/h",
      gustSpeed: "85 km/h",
      shutdownThreshold: "90 km/h",
      duration: "4-6 hours",
      turbinesAffected: 24,
      powerLoss: "48 MW",
      revenueImpact: "$12,000/hour",
      safetyRisk: "Medium",
    },
    responseProtocol: {
      emergencyContacts: [
        { role: "Wind Farm Manager", name: "Robert Singh", phone: "+1-306-555-0456" },
        { role: "Maintenance Chief", name: "Anna Kowalski", phone: "+1-306-555-0789" },
        { role: "Grid Coordinator", name: "Tom Bradley", phone: "+1-306-555-0012" },
      ],
      resources: [
        { type: "Maintenance Crew", units: "Emergency response team", eta: "40 minutes" },
        { type: "Equipment Securing", units: "Mobile crane, safety equipment", eta: "35 minutes" },
        { type: "Grid Backup", units: "Alternative power routing", eta: "Immediate" },
      ],
      procedures: [
        "Initiate turbine shutdown sequence",
        "Secure all loose equipment and materials",
        "Deploy maintenance crew to safe positions",
        "Coordinate with grid operator for power rerouting",
        "Monitor weather conditions continuously",
      ],
    },
  },
  {
    id: 5,
    type: "pipeline_leak",
    severity: "HIGH",
    location: "Pipeline P-450, AB",
    sector: "oil_gas",
    distance: "0.0 km",
    confidence: 94,
    timeDetected: "2024-01-15 10:45",
    estimatedImpact: "Potential environmental contamination and safety risk",
    recommendedActions: ["Emergency shutdown", "Deploy response team", "Evacuate area"],
    coordinates: { lat: 51.0447, lng: -114.0719 }, // Calgary area
    details: {
      leakRate: "50 barrels/hour",
      product: "Crude oil",
      soilContamination: "2 hectares",
      evacuationRadius: "1 km",
      responseTeamETA: "45 minutes",
      cleanupCost: "$2.1M",
      regulatoryFines: "$500K",
      repairTime: "72 hours",
    },
    responseProtocol: {
      emergencyContacts: [
        { role: "Pipeline Operations", name: "Mark Johnson", phone: "+1-403-555-0567" },
        { role: "Emergency Response", name: "Jennifer Lee", phone: "+1-403-555-0890" },
        { role: "Environmental Lead", name: "Carlos Mendez", phone: "+1-403-555-0123" },
      ],
      resources: [
        { type: "Spill Response", units: "Hazmat team, containment equipment", eta: "20 minutes" },
        { type: "Evacuation", units: "Emergency vehicles, personnel", eta: "15 minutes" },
        { type: "Repair Crew", units: "Pipeline specialists, equipment", eta: "60 minutes" },
      ],
      procedures: [
        "Execute emergency pipeline shutdown",
        "Establish 1km evacuation perimeter",
        "Deploy spill containment measures",
        "Notify Alberta Energy Regulator immediately",
        "Coordinate with local emergency services",
      ],
    },
  },
]

const mockInfrastructure = [
  {
    id: "T-401",
    type: "Transmission Line",
    sector: "electricity",
    status: "At Risk",
    riskLevel: 85,
    location: "BC",
    coordinates: { lat: 49.2827, lng: -123.1207 },
    details: {
      voltage: "500 kV",
      length: "125 km",
      capacity: "1,200 MW",
      age: "35 years",
      lastMaintenance: "2024-01-10",
      criticalityScore: "High",
      customersServed: 45000,
      backupAvailable: "Limited",
    },
  },
  {
    id: "R-105",
    type: "Oil Refinery",
    sector: "oil_gas",
    status: "Monitoring",
    riskLevel: 65,
    location: "AB",
    coordinates: { lat: 53.5461, lng: -113.4938 },
    details: {
      capacity: "150,000 bpd",
      products: ["Gasoline", "Diesel", "Jet Fuel"],
      employees: 850,
      environmentalRating: "B+",
      lastInspection: "2024-01-08",
      complianceStatus: "Good",
      emissionsLevel: "Within limits",
      safetyRecord: "98.5%",
    },
  },
  {
    id: "H-203",
    type: "Hydro Dam",
    sector: "renewable",
    status: "Alert",
    riskLevel: 78,
    location: "QC",
    coordinates: { lat: 45.5017, lng: -73.5673 },
    details: {
      capacity: "2,100 MW",
      reservoirVolume: "11.5 billion m³",
      height: "214 m",
      yearBuilt: "1968",
      turbines: 16,
      annualGeneration: "35 TWh",
      fishLadders: "Yes",
      floodRisk: "Low",
    },
  },
  {
    id: "W-301",
    type: "Wind Farm",
    sector: "renewable",
    status: "Monitoring",
    riskLevel: 45,
    location: "SK",
    coordinates: { lat: 52.1579, lng: -106.6702 },
    details: {
      turbines: 24,
      capacity: "48 MW",
      hubHeight: "80 m",
      rotorDiameter: "77 m",
      capacity_factor: "32%",
      annualGeneration: "134 GWh",
      wildlifeImpact: "Minimal",
      noiseLevel: "Compliant",
    },
  },
  {
    id: "P-450",
    type: "Pipeline",
    sector: "oil_gas",
    status: "Critical",
    riskLevel: 94,
    location: "AB",
    coordinates: { lat: 51.0447, lng: -114.0719 },
    details: {
      diameter: "36 inches",
      length: "450 km",
      capacity: "400,000 bpd",
      product: "Crude oil",
      pressure: "1,440 psi",
      material: "API 5L X70",
      lastInspection: "2023-11-15",
      integrityStatus: "Compromised",
    },
  },
  {
    id: "S-205",
    type: "Solar Farm",
    sector: "renewable",
    status: "Normal",
    riskLevel: 12,
    location: "ON",
    coordinates: { lat: 43.6532, lng: -79.3832 },
    details: {
      capacity: "100 MW",
      panels: 350000,
      area: "400 hectares",
      efficiency: "19.2%",
      tracking: "Single-axis",
      inverters: 50,
      gridConnection: "230 kV",
      annualGeneration: "150 GWh",
    },
  },
  {
    id: "G-103",
    type: "Gas Plant",
    sector: "oil_gas",
    status: "Normal",
    riskLevel: 18,
    location: "AB",
    coordinates: { lat: 56.7267, lng: -111.379 },
    details: {
      capacity: "800 MW",
      efficiency: "58%",
      fuelType: "Natural Gas",
      emissions: "350 kg CO2/MWh",
      startupTime: "10 minutes",
      rampRate: "50 MW/min",
      heatRate: "6,100 BTU/kWh",
      waterUsage: "Low",
    },
  },
  {
    id: "N-401",
    type: "Nuclear Plant",
    sector: "electricity",
    status: "Normal",
    riskLevel: 8,
    location: "ON",
    coordinates: { lat: 44.3106, lng: -81.6017 },
    details: {
      reactors: 4,
      capacity: "3,512 MW",
      type: "CANDU",
      fuel: "Natural Uranium",
      capacity_factor: "85%",
      safetyRating: "Excellent",
      wasteStorage: "On-site",
      lifeExtension: "2033",
    },
  },
]

// Enhanced Interactive Map Component with highlight functionality
const InteractiveMap = ({
  alerts,
  infrastructure,
  selectedSector,
  selectedThreat,
  onMarkerClick,
  highlightedAlert,
}) => {
  const filteredAlerts = alerts.filter((alert) => {
    const sectorMatch = selectedSector === "all" || alert.sector === selectedSector
    const threatMatch = selectedThreat === "all" || alert.type === selectedThreat
    return sectorMatch && threatMatch
  })

  const filteredInfrastructure = infrastructure.filter(
    (asset) => selectedSector === "all" || asset.sector === selectedSector,
  )

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "HIGH":
        return "#ef4444"
      case "MEDIUM":
        return "#f59e0b"
      case "LOW":
        return "#10b981"
      default:
        return "#6b7280"
    }
  }

  const getRiskColor = (riskLevel) => {
    if (riskLevel > 70) return "#ef4444"
    if (riskLevel > 40) return "#f59e0b"
    return "#10b981"
  }

  const getSectorIcon = (sector) => {
    switch (sector) {
      case "electricity":
        return "⚡"
      case "oil_gas":
        return "🛢️"
      case "renewable":
        return "🌱"
      default:
        return "🏭"
    }
  }

  const getThreatIcon = (type) => {
    switch (type) {
      case "wildfire":
        return "🔥"
      case "air_quality":
        return "💨"
      case "water_quality":
        return "💧"
      case "extreme_weather":
        return "🌪️"
      case "pipeline_leak":
        return "⚠️"
      default:
        return "❗"
    }
  }

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden border">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
        {/* Canada outline representation */}
        <svg className="w-full h-full opacity-20" viewBox="0 0 800 400">
          <path
            d="M100 200 Q200 150 300 180 Q400 160 500 190 Q600 170 700 200 Q650 250 600 280 Q500 300 400 290 Q300 310 200 280 Q150 250 100 200"
            fill="#10b981"
            stroke="#059669"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Province Labels */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 sm:top-16 sm:left-16 text-xs font-medium text-gray-600">BC</div>
        <div className="absolute top-10 left-16 sm:top-20 sm:left-32 text-xs font-medium text-gray-600">AB</div>
        <div className="absolute top-12 left-24 sm:top-24 sm:left-48 text-xs font-medium text-gray-600">SK</div>
        <div className="absolute top-10 right-16 sm:top-20 sm:right-32 text-xs font-medium text-gray-600">ON</div>
        <div className="absolute top-8 right-8 sm:top-16 sm:right-16 text-xs font-medium text-gray-600">QC</div>
      </div>

      {/* Alert Markers */}
      {filteredAlerts.map((alert) => {
        const x = ((alert.coordinates.lng + 140) / 80) * 100 // Normalize longitude to percentage
        const y = ((60 - alert.coordinates.lat) / 20) * 100 // Normalize latitude to percentage
        const isHighlighted = highlightedAlert && highlightedAlert.id === alert.id

        return (
          <div
            key={`alert-${alert.id}`}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
              isHighlighted ? "scale-125 sm:scale-150 z-20" : "hover:scale-110 z-10"
            }`}
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={() => onMarkerClick("alert", alert)}
          >
            <div
              className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold ${
                isHighlighted ? "animate-bounce border-4 border-yellow-400" : "animate-pulse"
              }`}
              style={{ backgroundColor: getSeverityColor(alert.severity) }}
              title={`${alert.type.replace("_", " ").toUpperCase()} - ${alert.location}`}
            >
              <span className="text-xs sm:text-sm">{getThreatIcon(alert.type)}</span>
            </div>
            {isHighlighted && (
              <div className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs px-2 py-1 sm:px-3 sm:py-2 rounded-lg font-bold shadow-lg animate-pulse whitespace-nowrap">
                🎯 INCIDENT LOCATION
              </div>
            )}
            <div className="absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
              {alert.location}
            </div>
          </div>
        )
      })}

      {/* Infrastructure Markers */}
      {filteredInfrastructure.map((asset) => {
        const x = ((asset.coordinates.lng + 140) / 80) * 100
        const y = ((60 - asset.coordinates.lat) / 20) * 100

        return (
          <div
            key={`infra-${asset.id}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={() => onMarkerClick("infrastructure", asset)}
          >
            <div
              className="w-3 h-3 sm:w-5 sm:h-5 rounded border-2 border-white shadow-lg flex items-center justify-center text-xs"
              style={{ backgroundColor: getRiskColor(asset.riskLevel) }}
              title={`${asset.id} - ${asset.type}`}
            >
              <span className="text-xs">{getSectorIcon(asset.sector)}</span>
            </div>
            <div className="absolute top-3 sm:top-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
              {asset.id} - {asset.type}
            </div>
          </div>
        )
      })}

      {/* Map Legend */}
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white bg-opacity-90 p-2 sm:p-3 rounded-lg shadow-lg">
        <h4 className="font-medium text-xs sm:text-sm mb-1 sm:mb-2">Map Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
            <span className="text-xs">High Severity</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs">Medium Severity</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-red-500"></div>
            <span className="text-xs">Critical Infrastructure</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-green-500"></div>
            <span className="text-xs">Normal Operations</span>
          </div>
          {highlightedAlert && (
            <div className="flex items-center gap-1 sm:gap-2 border-t pt-1 sm:pt-2 mt-1 sm:mt-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400 animate-pulse"></div>
              <span className="font-bold text-xs">Active Incident</span>
            </div>
          )}
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white bg-opacity-90 p-1 sm:p-2 rounded-lg shadow-lg">
        <div className="flex flex-col gap-1 sm:gap-2">
          <Button size="sm" variant="outline" className="text-xs h-6 sm:h-8">
            <Layers className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
            <span className="hidden sm:inline">Layers</span>
          </Button>
          <Button size="sm" variant="outline" className="text-xs h-6 sm:h-8">
            <MapPin className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
            <span className="hidden sm:inline">Center</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

// Professional Response Dialog Component
const ResponseDialog = ({
  alert,
  isOpen,
  onClose,
  onResponseInitiated,
  onResponseDeactivated,
  isDeactivating = false,
}) => {
  const [responseStatus, setResponseStatus] = useState(isDeactivating ? "deactivating" : "preparing") // preparing, initiated, active, deactivating, completed
  const [selectedContacts, setSelectedContacts] = useState([])
  const [selectedResources, setSelectedResources] = useState([])

  const handleInitiateResponse = () => {
    setResponseStatus("initiated")

    // Simulate professional response sequence
    setTimeout(() => {
      setResponseStatus("active")
      onResponseInitiated(alert)
    }, 2000)
  }

  const handleDeactivateResponse = () => {
    setResponseStatus("deactivating")

    // Simulate deactivation sequence
    setTimeout(() => {
      setResponseStatus("completed")
      onResponseDeactivated(alert)
    }, 2000)
  }

  const toggleContact = (contact) => {
    setSelectedContacts((prev) => (prev.includes(contact) ? prev.filter((c) => c !== contact) : [...prev, contact]))
  }

  const toggleResource = (resource) => {
    setSelectedResources((prev) => (prev.includes(resource) ? prev.filter((r) => r !== resource) : [...prev, resource]))
  }

  if (!alert) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sm sm:text-base">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
            {isDeactivating ? "Deactivate Response - " : "Emergency Response Protocol - "}
            {alert.type.replace("_", " ").toUpperCase()}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            {isDeactivating ? "Deactivate emergency response for " : "Professional incident response coordination for "}
            {alert.location}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-64 sm:h-96">
          <div className="space-y-4 sm:space-y-6">
            {/* Response Status */}
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                <Radio className="h-3 w-3 sm:h-4 sm:w-4" />
                Response Status
              </h3>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                {isDeactivating ? (
                  <>
                    <Badge variant={responseStatus === "deactivating" ? "default" : "secondary"} className="text-xs">
                      {responseStatus === "deactivating" ? "🔄 Deactivating" : "✓ Deactivated"}
                    </Badge>
                    <Badge variant={responseStatus === "completed" ? "success" : "secondary"} className="text-xs">
                      {responseStatus === "completed" ? "✓ COMPLETED" : "⏳ Pending"}
                    </Badge>
                  </>
                ) : (
                  <>
                    <Badge variant={responseStatus === "preparing" ? "default" : "secondary"} className="text-xs">
                      {responseStatus === "preparing" ? "🔄 Preparing" : "✓ Prepared"}
                    </Badge>
                    <Badge variant={responseStatus === "initiated" ? "default" : "secondary"} className="text-xs">
                      {responseStatus === "initiated"
                        ? "🚨 Initiating"
                        : responseStatus === "active"
                          ? "✓ Initiated"
                          : "⏳ Pending"}
                    </Badge>
                    <Badge variant={responseStatus === "active" ? "destructive" : "secondary"} className="text-xs">
                      {responseStatus === "active" ? "🔥 ACTIVE RESPONSE" : "⏳ Pending"}
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                Emergency Contacts
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {alert.responseProtocol.emergencyContacts.map((contact, idx) => (
                  <div
                    key={idx}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedContacts.includes(contact) ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleContact(contact)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{contact.role}</div>
                        <div className="text-xs text-gray-600">{contact.name}</div>
                        <div className="text-xs text-blue-600">{contact.phone}</div>
                      </div>
                      <div className="flex gap-1 sm:gap-2">
                        <Button size="sm" variant="outline" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                          <Phone className="h-2 w-2 sm:h-3 sm:w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                          <Send className="h-2 w-2 sm:h-3 sm:w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resource Deployment */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Truck className="h-3 w-3 sm:h-4 sm:w-4" />
                Resource Deployment
              </h3>
              <div className="space-y-3">
                {alert.responseProtocol.resources.map((resource, idx) => (
                  <div
                    key={idx}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedResources.includes(resource) ? "bg-green-50 border-green-300" : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleResource(resource)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{resource.type}</div>
                        <div className="text-xs text-gray-600">{resource.units}</div>
                        <div className="text-xs text-orange-600">ETA: {resource.eta}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {isDeactivating ? "Recall" : "Ready"}
                        </Badge>
                        <Button size="sm" variant="outline" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                          <Radio className="h-2 w-2 sm:h-3 sm:w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Procedures */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                {isDeactivating ? "Deactivation Procedures" : "Response Procedures"}
              </h3>
              <div className="space-y-2">
                {isDeactivating
                  ? // Deactivation procedures
                    [
                      "Stand down emergency teams",
                      "Complete incident documentation",
                      "Notify all stakeholders",
                      "Conduct post-incident review",
                      "Return to normal operations",
                    ].map((procedure, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </div>
                        <span className="text-xs sm:text-sm">{procedure}</span>
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 ml-auto" />
                      </div>
                    ))
                  : // Regular response procedures
                    alert.responseProtocol.procedures.map((procedure, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </div>
                        <span className="text-xs sm:text-sm">{procedure}</span>
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 ml-auto" />
                      </div>
                    ))}
              </div>
            </div>

            {/* Response Actions */}
            <div className="border-t pt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                {isDeactivating ? (
                  // Deactivation actions
                  responseStatus === "deactivating" ? (
                    <div className="flex items-center gap-2 text-orange-600">
                      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-orange-600"></div>
                      <span className="font-medium text-xs sm:text-sm">Deactivating response protocols...</span>
                    </div>
                  ) : responseStatus === "completed" ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="font-medium text-xs sm:text-sm">Response successfully deactivated</span>
                    </div>
                  ) : (
                    <Button
                      onClick={handleDeactivateResponse}
                      className="bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm"
                    >
                      <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      DEACTIVATE EMERGENCY RESPONSE
                    </Button>
                  )
                ) : (
                  // Regular activation actions
                  responseStatus === "preparing" && (
                    <Button
                      onClick={handleInitiateResponse}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm"
                      disabled={selectedContacts.length === 0 || selectedResources.length === 0}
                    >
                      <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      INITIATE EMERGENCY RESPONSE
                    </Button>
                  )
                )}

                {responseStatus === "initiated" && !isDeactivating && (
                  <div className="flex items-center gap-2 text-orange-600">
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-orange-600"></div>
                    <span className="font-medium text-xs sm:text-sm">Activating response protocols...</span>
                  </div>
                )}

                {responseStatus === "active" && !isDeactivating && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="font-medium text-xs sm:text-sm">
                      Emergency response active - All teams deployed
                    </span>
                  </div>
                )}

                <Button variant="outline" onClick={onClose} className="text-xs sm:text-sm">
                  Close
                </Button>
              </div>

              {(selectedContacts.length === 0 || selectedResources.length === 0) &&
                responseStatus === "preparing" &&
                !isDeactivating && (
                  <p className="text-xs text-gray-500 mt-2">
                    Please select emergency contacts and resources before initiating response.
                  </p>
                )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

const mockEnvironmentalData = {
  air_quality: {
    current_aqi: 68,
    status: "Moderate",
    trend: "improving",
    locations_monitored: 45,
    alerts_active: 2,
    details: {
      pm25: 15.2,
      pm10: 28.5,
      ozone: 45.8,
      no2: 12.3,
      so2: 5.1,
      co: 0.8,
      worstLocation: "Calgary Industrial",
      bestLocation: "Banff National Park",
      forecast: "Improving over next 48 hours",
    },
  },
  water_quality: {
    sites_monitored: 78,
    compliance_rate: 94.2,
    contamination_events: 1,
    trend: "stable",
    details: {
      ph_average: 7.2,
      dissolved_oxygen: 8.5,
      turbidity: 2.1,
      bacteria_count: "Within limits",
      heavy_metals: "Trace amounts",
      temperature: 12.5,
      flow_rate: "Normal",
      seasonal_variation: "Expected",
    },
  },
  weather: {
    extreme_events: 3,
    forecast_accuracy: 91.5,
    early_warnings: 12,
    coverage_area: "2.1M km²",
    details: {
      temperature_range: "-15°C to 28°C",
      precipitation: "Above average",
      wind_patterns: "Westerly",
      pressure_systems: "2 low, 1 high",
      severe_weather_risk: "Medium",
      seasonal_outlook: "Warmer than normal",
    },
  },
  wildfire: {
    active_fires: 23,
    risk_level: "High",
    area_monitored: "1.8M km²",
    detection_time: "8.5 min",
    details: {
      fire_danger_rating: "Extreme",
      humidity_levels: "15-25%",
      fuel_moisture: "8%",
      lightning_strikes: 145,
      human_caused: 8,
      suppression_resources: "85% deployed",
      containment_rate: "65%",
    },
  },
}

const mockMetrics = {
  threatsDetected: 47,
  infrastructureMonitored: 156,
  avgResponseTime: "9 minutes",
  costSavings: "$4.7M",
  environmentalCompliance: "96.8%",
  sectorsMonitored: 3,
}

const detailedMetrics = {
  threatsDetected: {
    title: "Threats Detected",
    description: "Environmental and infrastructure threats identified in the last 30 days",
    breakdown: {
      wildfire: 18,
      air_quality: 12,
      water_quality: 8,
      extreme_weather: 6,
      pipeline_issues: 3,
    },
    trend: "+15% from last month",
    accuracy: "94.2%",
  },
  infrastructureMonitored: {
    title: "Infrastructure Assets",
    description: "Total energy infrastructure assets under continuous monitoring",
    breakdown: {
      electricity: 65,
      oil_gas: 48,
      renewable: 43,
    },
    coverage: "98.5% uptime",
    dataPoints: "2.3M per hour",
  },
  avgResponseTime: {
    title: "Average Response Time",
    description: "Time from threat detection to alert notification",
    breakdown: {
      critical: "3.2 minutes",
      high: "8.5 minutes",
      medium: "15.1 minutes",
      low: "45.2 minutes",
    },
    target: "< 10 minutes",
    improvement: "-25% from last quarter",
  },
  costSavings: {
    title: "Estimated Cost Savings",
    description: "Prevented losses through early threat detection and response",
    breakdown: {
      outage_prevention: "$2.1M",
      environmental_fines: "$1.2M",
      equipment_damage: "$0.9M",
      emergency_response: "$0.5M",
    },
    roi: "340%",
    payback_period: "8.5 months",
  },
}

const sectorIcons = {
  electricity: Zap,
  oil_gas: Fuel,
  renewable: Sun,
}

const threatIcons = {
  wildfire: Flame,
  air_quality: Wind,
  water_quality: Droplets,
  extreme_weather: Thermometer,
  pipeline_leak: AlertTriangle,
}

const getSeverityColor = (severity) => {
  switch (severity) {
    case "HIGH":
      return "text-red-600 bg-red-50 border-red-200"
    case "MEDIUM":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "LOW":
      return "text-green-600 bg-green-50 border-green-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

// Mobile Navigation Component
const MobileNav = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "infrastructure", label: "Infrastructure", icon: Building },
    { id: "environmental", label: "Environmental", icon: Leaf },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="bg-white shadow-lg">
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
        </div>
        <nav className="p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
          </div>
        </nav>
      </div>
    </>
  )
}

export default function EnergySenseComprehensive() {
  // Add isDeactivating state
  const [isDeactivating, setIsDeactivating] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedSector, setSelectedSector] = useState("all")
  const [selectedThreat, setSelectedThreat] = useState("all")
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [selectedInfrastructure, setSelectedInfrastructure] = useState(null)
  const [selectedMapItem, setSelectedMapItem] = useState(null)
  const [highlightedAlert, setHighlightedAlert] = useState(null)
  const [responseDialogOpen, setResponseDialogOpen] = useState(false)
  const [responseAlert, setResponseAlert] = useState(null)
  const [activeResponses, setActiveResponses] = useState([])
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const filteredAlerts = mockAlerts.filter((alert) => {
    const sectorMatch = selectedSector === "all" || alert.sector === selectedSector
    const threatMatch = selectedThreat === "all" || alert.type === selectedThreat
    return sectorMatch && threatMatch
  })

  const filteredInfrastructure = mockInfrastructure.filter(
    (asset) => selectedSector === "all" || asset.sector === selectedSector,
  )

  const handleMetricClick = (metricKey) => {
    setActiveTab("analytics")
  }

  const handleEnvironmentalClick = (envType) => {
    setActiveTab("environmental")
  }

  const handleViewDetails = (alert) => {
    setHighlightedAlert(alert)
    // Auto-scroll to map or switch to a view that shows the map
    const mapElement = document.querySelector('[data-map="true"]')
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Update the handleInitiateResponse function to properly track individual alerts
  const handleInitiateResponse = (alert) => {
    setResponseAlert(alert)
    setResponseDialogOpen(true)
    setIsDeactivating(false)
  }

  // Add a new function to handle deactivating responses
  const handleDeactivateResponse = (alert) => {
    setResponseAlert(alert)
    setResponseDialogOpen(true)
    setIsDeactivating(true)
  }

  // Update the handleResponseInitiated function to properly track by ID
  const handleResponseInitiated = (alert) => {
    setActiveResponses((prev) => [...prev.filter((a) => a.id !== alert.id), alert])
    setResponseDialogOpen(false)
    setResponseAlert(null)

    // Show success notification
    alert(
      `🚨 EMERGENCY RESPONSE ACTIVATED for ${alert.type.replace("_", " ").toUpperCase()} at ${alert.location}\n\n✅ All emergency contacts notified\n✅ Response teams deployed\n✅ Protocols activated`,
    )
  }

  // Add a new function to handle response deactivation
  const handleResponseDeactivated = (alert) => {
    setActiveResponses((prev) => prev.filter((a) => a.id !== alert.id))
    setResponseDialogOpen(false)
    setResponseAlert(null)
    setIsDeactivating(false)

    // Show success notification
    alert(
      `✅ EMERGENCY RESPONSE DEACTIVATED for ${alert.type.replace("_", " ").toUpperCase()} at ${alert.location}\n\n✅ All teams recalled\n✅ Incident closed\n✅ Normal operations resumed`,
    )
  }

  const handleMapMarkerClick = (type, item) => {
    setSelectedMapItem({ type, item })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Mobile Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={mobileNavOpen}
        setIsOpen={setMobileNavOpen}
      />

      <div className="p-2 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-4 sm:mb-6 md:mb-8 mt-12 md:mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                  EnergyEminence Platform
                </h1>
                <p className="text-sm sm:text-lg md:text-xl text-gray-600">
                  AI-Powered Environmental & Energy Infrastructure Monitoring
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xs sm:text-sm text-gray-500">Live Monitoring</div>
                <div className="text-sm sm:text-lg font-semibold text-green-600 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  All Systems Active
                </div>
                {activeResponses.length > 0 && (
                  <div className="text-xs sm:text-sm text-red-600 font-medium mt-1">
                    🚨 {activeResponses.length} Active Emergency Response{activeResponses.length > 1 ? "s" : ""}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Key Metrics with Click Functionality */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Threats Detected</CardTitle>
                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold">{mockMetrics.threatsDetected}</div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl mx-4">
                <DialogHeader>
                  <DialogTitle>Threat Detection Details</DialogTitle>
                  <DialogDescription>
                    Comprehensive breakdown of environmental and infrastructure threats detected
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Threat Breakdown</h4>
                      <div className="space-y-2">
                        {Object.entries(detailedMetrics.threatsDetected.breakdown).map(([type, count]) => (
                          <div key={type} className="flex justify-between">
                            <span className="capitalize text-sm">{type.replace("_", " ")}</span>
                            <span className="font-medium text-sm">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Performance Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Detection Accuracy</span>
                          <span className="font-medium text-green-600 text-sm">
                            {detailedMetrics.threatsDetected.accuracy}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Trend</span>
                          <span className="font-medium text-green-600 text-sm">
                            {detailedMetrics.threatsDetected.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Infrastructure</CardTitle>
                    <Factory className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold">{mockMetrics.infrastructureMonitored}</div>
                    <p className="text-xs text-muted-foreground">Assets monitored</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl mx-4">
                <DialogHeader>
                  <DialogTitle>Infrastructure Monitoring Details</DialogTitle>
                  <DialogDescription>Complete overview of monitored energy infrastructure assets</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Assets by Sector</h4>
                      <div className="space-y-2">
                        {Object.entries(detailedMetrics.infrastructureMonitored.breakdown).map(([sector, count]) => (
                          <div key={sector} className="flex justify-between">
                            <span className="capitalize text-sm">{sector.replace("_", " ")}</span>
                            <span className="font-medium text-sm">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">System Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">System Uptime</span>
                          <span className="font-medium text-green-600 text-sm">
                            {detailedMetrics.infrastructureMonitored.coverage}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Data Points/Hour</span>
                          <span className="font-medium text-sm">
                            {detailedMetrics.infrastructureMonitored.dataPoints}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Response Time</CardTitle>
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold">{mockMetrics.avgResponseTime}</div>
                    <p className="text-xs text-muted-foreground">Avg detection to alert</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl mx-4">
                <DialogHeader>
                  <DialogTitle>Response Time Analysis</DialogTitle>
                  <DialogDescription>Detailed breakdown of system response times by threat severity</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Response Times by Severity</h4>
                      <div className="space-y-2">
                        {Object.entries(detailedMetrics.avgResponseTime.breakdown).map(([severity, time]) => (
                          <div key={severity} className="flex justify-between">
                            <span className="capitalize text-sm">{severity}</span>
                            <span className="font-medium text-sm">{time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Performance Targets</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Target</span>
                          <span className="font-medium text-sm">{detailedMetrics.avgResponseTime.target}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Improvement</span>
                          <span className="font-medium text-green-600 text-sm">
                            {detailedMetrics.avgResponseTime.improvement}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Cost Savings</CardTitle>
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold">{mockMetrics.costSavings}</div>
                    <p className="text-xs text-muted-foreground">Prevented losses</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl mx-4">
                <DialogHeader>
                  <DialogTitle>Cost Savings Analysis</DialogTitle>
                  <DialogDescription>Detailed breakdown of prevented losses and financial benefits</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Savings Breakdown</h4>
                      <div className="space-y-2">
                        {Object.entries(detailedMetrics.costSavings.breakdown).map(([category, amount]) => (
                          <div key={category} className="flex justify-between">
                            <span className="capitalize text-sm">{category.replace("_", " ")}</span>
                            <span className="font-medium text-green-600 text-sm">{amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">ROI Analysis</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">ROI</span>
                          <span className="font-medium text-green-600 text-sm">{detailedMetrics.costSavings.roi}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Payback Period</span>
                          <span className="font-medium text-sm">{detailedMetrics.costSavings.payback_period}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveTab("environmental")}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Compliance</CardTitle>
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg sm:text-2xl font-bold">{mockMetrics.environmentalCompliance}</div>
                <p className="text-xs text-muted-foreground">Environmental compliance</p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveTab("infrastructure")}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Sectors</CardTitle>
                <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-teal-600" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg sm:text-2xl font-bold">{mockMetrics.sectorsMonitored}</div>
                <p className="text-xs text-muted-foreground">Energy sectors</p>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Map Section */}
          <Card className="mb-4 sm:mb-6 md:mb-8" data-map="true">
            <CardHeader>
              <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                Real-Time Threat & Infrastructure Map
                {highlightedAlert && (
                  <Badge variant="destructive" className="ml-2 animate-pulse text-xs">
                    🎯 Showing: {highlightedAlert.location}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Interactive map showing live alerts and infrastructure status across Canada
                {highlightedAlert && " - Click on the highlighted marker for incident details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InteractiveMap
                alerts={mockAlerts}
                infrastructure={mockInfrastructure}
                selectedSector={selectedSector}
                selectedThreat={selectedThreat}
                onMarkerClick={handleMapMarkerClick}
                highlightedAlert={highlightedAlert}
              />
              {highlightedAlert && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800 text-sm">
                        Incident Location Highlighted: {highlightedAlert.location}
                      </span>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => setHighlightedAlert(null)}>
                      Clear Highlight
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Map Item Detail Dialog */}
          {selectedMapItem && (
            <Dialog open={!!selectedMapItem} onOpenChange={() => setSelectedMapItem(null)}>
              <DialogContent className="max-w-3xl mx-4">
                <DialogHeader>
                  <DialogTitle className="text-sm sm:text-base">
                    {selectedMapItem.type === "alert"
                      ? `${selectedMapItem.item.type.replace("_", " ").toUpperCase()} Alert Details`
                      : `${selectedMapItem.item.id} - Infrastructure Details`}
                  </DialogTitle>
                  <DialogDescription className="text-xs sm:text-sm">
                    {selectedMapItem.type === "alert"
                      ? "Comprehensive threat analysis and response information"
                      : "Complete infrastructure specifications and operational status"}
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-64 sm:h-96">
                  <div className="space-y-4">
                    {selectedMapItem.type === "alert" ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Alert Information</h4>
                          <div className="space-y-2 text-xs sm:text-sm">
                            <div className="flex justify-between">
                              <span>Location:</span>
                              <span className="font-medium">{selectedMapItem.item.location}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Severity:</span>
                              <Badge variant={selectedMapItem.item.severity === "HIGH" ? "destructive" : "default"}>
                                {selectedMapItem.item.severity}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Confidence:</span>
                              <span className="font-medium">{selectedMapItem.item.confidence}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Time Detected:</span>
                              <span className="font-medium">{selectedMapItem.item.timeDetected}</span>
                            </div>
                          </div>
                          <h4 className="font-medium mb-2 mt-4 text-sm">Threat Details</h4>
                          <div className="space-y-2 text-xs sm:text-sm">
                            {Object.entries(selectedMapItem.item.details).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="capitalize">{key.replace("_", " ")}:</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Impact Assessment</h4>
                          <p className="text-xs sm:text-sm text-gray-700 mb-4">
                            {selectedMapItem.item.estimatedImpact}
                          </p>
                          <h4 className="font-medium mb-2 text-sm">Recommended Actions</h4>
                          <div className="space-y-2">
                            {selectedMapItem.item.recommendedActions.map((action, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                                <span className="text-xs sm:text-sm">{action}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4">
                            {activeResponses.some((response) => response.id === selectedMapItem.item.id) ? (
                              <Button
                                onClick={() => handleDeactivateResponse(selectedMapItem.item)}
                                className="bg-amber-600 hover:bg-amber-700 w-full text-xs sm:text-sm"
                              >
                                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                Deactivate Emergency Response
                              </Button>
                            ) : (
                              <Button
                                onClick={() => handleInitiateResponse(selectedMapItem.item)}
                                className="bg-red-600 hover:bg-red-700 w-full text-xs sm:text-sm"
                              >
                                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                Initiate Emergency Response
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Infrastructure Information</h4>
                          <div className="space-y-2 text-xs sm:text-sm">
                            <div className="flex justify-between">
                              <span>Asset ID:</span>
                              <span className="font-medium">{selectedMapItem.item.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Type:</span>
                              <span className="font-medium">{selectedMapItem.item.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Location:</span>
                              <span className="font-medium">{selectedMapItem.item.location}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sector:</span>
                              <Badge variant="outline">{selectedMapItem.item.sector.replace("_", " ")}</Badge>
                            </div>
                          </div>
                          <h4 className="font-medium mb-2 mt-4 text-sm">Technical Specifications</h4>
                          <div className="space-y-2 text-xs sm:text-sm">
                            {Object.entries(selectedMapItem.item.details).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="capitalize">{key.replace("_", " ")}:</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Risk Assessment</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs sm:text-sm">Current Risk Level</span>
                                <span className="text-xs sm:text-sm font-medium">
                                  {selectedMapItem.item.riskLevel}%
                                </span>
                              </div>
                              <Progress value={selectedMapItem.item.riskLevel} />
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs sm:text-sm">Operational Status:</span>
                              <Badge
                                variant={
                                  selectedMapItem.item.riskLevel > 70
                                    ? "destructive"
                                    : selectedMapItem.item.riskLevel > 40
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {selectedMapItem.item.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          )}

          {/* Professional Response Dialog */}
          <ResponseDialog
            alert={responseAlert}
            isOpen={responseDialogOpen}
            onClose={() => {
              setResponseDialogOpen(false)
              setIsDeactivating(false)
            }}
            onResponseInitiated={handleResponseInitiated}
            onResponseDeactivated={handleResponseDeactivated}
            isDeactivating={isDeactivating}
          />

          {/* Environmental Monitoring Overview with Click Functionality */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-6 md:mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Air Quality</CardTitle>
                    <Wind className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold">{mockEnvironmentalData.air_quality.current_aqi}</div>
                    <p className="text-xs text-muted-foreground">AQI - {mockEnvironmentalData.air_quality.status}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {mockEnvironmentalData.air_quality.locations_monitored} sites
                      </Badge>
                      <Badge
                        variant={mockEnvironmentalData.air_quality.alerts_active > 0 ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {mockEnvironmentalData.air_quality.alerts_active} alerts
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-3xl mx-4">
                <DialogHeader>
                  <DialogTitle>Air Quality Monitoring Details</DialogTitle>
                  <DialogDescription>
                    Comprehensive air quality data and pollutant levels across monitoring sites
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-64 sm:h-96">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Current Pollutant Levels (μg/m³)</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">PM2.5</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.air_quality.details.pm25}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">PM10</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.air_quality.details.pm10}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Ozone</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.air_quality.details.ozone}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">NO₂</span>
                            <span className="font-medium text-sm">{mockEnvironmentalData.air_quality.details.no2}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">SO₂</span>
                            <span className="font-medium text-sm">{mockEnvironmentalData.air_quality.details.so2}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">CO</span>
                            <span className="font-medium text-sm">{mockEnvironmentalData.air_quality.details.co}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Location Analysis</h4>
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm text-gray-600">Worst Location:</span>
                            <p className="font-medium text-red-600 text-sm">
                              {mockEnvironmentalData.air_quality.details.worstLocation}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Best Location:</span>
                            <p className="font-medium text-green-600 text-sm">
                              {mockEnvironmentalData.air_quality.details.bestLocation}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">48h Forecast:</span>
                            <p className="font-medium text-sm">{mockEnvironmentalData.air_quality.details.forecast}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Water Quality</CardTitle>
                    <Droplets className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-500" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold">
                      {mockEnvironmentalData.water_quality.compliance_rate}%
                    </div>
                    <p className="text-xs text-muted-foreground">Compliance Rate</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {mockEnvironmentalData.water_quality.sites_monitored} sites
                      </Badge>
                      <Badge
                        variant={
                          mockEnvironmentalData.water_quality.contamination_events > 0 ? "destructive" : "secondary"
                        }
                        className="text-xs"
                      >
                        {mockEnvironmentalData.water_quality.contamination_events} events
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-3xl mx-4">
                <DialogHeader>
                  <DialogTitle>Water Quality Monitoring Details</DialogTitle>
                  <DialogDescription>
                    Detailed water quality parameters and compliance status across monitoring sites
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-64 sm:h-96">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Water Quality Parameters</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">pH Level</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.water_quality.details.ph_average}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Dissolved Oxygen (mg/L)</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.water_quality.details.dissolved_oxygen}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Turbidity (NTU)</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.water_quality.details.turbidity}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Temperature (°C)</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.water_quality.details.temperature}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Contamination Analysis</h4>
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm text-gray-600">Bacteria Count:</span>
                            <p className="font-medium text-green-600 text-sm">
                              {mockEnvironmentalData.water_quality.details.bacteria_count}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Heavy Metals:</span>
                            <p className="font-medium text-green-600 text-sm">
                              {mockEnvironmentalData.water_quality.details.heavy_metals}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Flow Rate:</span>
                            <p className="font-medium text-sm">
                              {mockEnvironmentalData.water_quality.details.flow_rate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Weather Monitoring</CardTitle>
                    <Thermometer className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold">
                      {mockEnvironmentalData.weather.forecast_accuracy}%
                    </div>
                    <p className="text-xs text-muted-foreground">Forecast Accuracy</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {mockEnvironmentalData.weather.coverage_area}
                      </Badge>
                      <Badge
                        variant={mockEnvironmentalData.weather.extreme_events > 0 ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {mockEnvironmentalData.weather.extreme_events} events
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-3xl mx-4">
                <DialogHeader>
                  <DialogTitle>Weather Monitoring Details</DialogTitle>
                  <DialogDescription>Comprehensive weather data and extreme event tracking</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-64 sm:h-96">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Current Conditions</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Temperature Range</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.weather.details.temperature_range}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Precipitation</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.weather.details.precipitation}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Wind Patterns</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.weather.details.wind_patterns}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Pressure Systems</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.weather.details.pressure_systems}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Risk Assessment</h4>
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm text-gray-600">Severe Weather Risk:</span>
                            <p className="font-medium text-yellow-600 text-sm">
                              {mockEnvironmentalData.weather.details.severe_weather_risk}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Seasonal Outlook:</span>
                            <p className="font-medium text-sm">
                              {mockEnvironmentalData.weather.details.seasonal_outlook}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Wildfire Detection</CardTitle>
                    <Flame className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold">{mockEnvironmentalData.wildfire.detection_time}</div>
                    <p className="text-xs text-muted-foreground">Avg Detection Time</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {mockEnvironmentalData.wildfire.area_monitored}
                      </Badge>
                      <Badge variant="destructive" className="text-xs">
                        {mockEnvironmentalData.wildfire.active_fires} active
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-3xl mx-4">
                <DialogHeader>
                  <DialogTitle>Wildfire Detection Details</DialogTitle>
                  <DialogDescription>Real-time wildfire monitoring and suppression status</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-64 sm:h-96">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Fire Conditions</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Fire Danger Rating</span>
                            <Badge variant="destructive" className="text-xs">
                              {mockEnvironmentalData.wildfire.details.fire_danger_rating}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Humidity Levels</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.wildfire.details.humidity_levels}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Fuel Moisture</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.wildfire.details.fuel_moisture}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Fire Causes & Response</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Lightning Strikes</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.wildfire.details.lightning_strikes}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Human Caused</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.wildfire.details.human_caused}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Resources Deployed</span>
                            <span className="font-medium text-sm">
                              {mockEnvironmentalData.wildfire.details.suppression_resources}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Containment Rate</span>
                            <span className="font-medium text-green-600 text-sm">
                              {mockEnvironmentalData.wildfire.details.containment_rate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="electricity">Electricity</SelectItem>
                <SelectItem value="oil_gas">Oil & Gas</SelectItem>
                <SelectItem value="renewable">Renewable Energy</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedThreat} onValueChange={setSelectedThreat}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by Threat Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Threats</SelectItem>
                <SelectItem value="wildfire">Wildfire</SelectItem>
                <SelectItem value="air_quality">Air Quality</SelectItem>
                <SelectItem value="water_quality">Water Quality</SelectItem>
                <SelectItem value="extreme_weather">Extreme Weather</SelectItem>
                <SelectItem value="pipeline_leak">Pipeline Issues</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Main Content with Improved Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
            {/* Desktop Navigation */}
            <TabsList className="hidden md:grid w-full grid-cols-5 h-12">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden lg:inline">Live Dashboard</span>
                <span className="lg:hidden">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden lg:inline">Active Alerts</span>
                <span className="lg:hidden">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="infrastructure" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="hidden lg:inline">Infrastructure</span>
                <span className="lg:hidden">Assets</span>
              </TabsTrigger>
              <TabsTrigger value="environmental" className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                <span className="hidden lg:inline">Environmental</span>
                <span className="lg:hidden">Environment</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden lg:inline">Analytics</span>
                <span className="lg:hidden">Analytics</span>
              </TabsTrigger>
            </TabsList>

            {/* Mobile Tab Indicator */}
            <div className="md:hidden bg-white rounded-lg p-3 shadow-sm border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {activeTab === "dashboard" && <Home className="h-4 w-4 text-blue-600" />}
                  {activeTab === "alerts" && <Bell className="h-4 w-4 text-red-600" />}
                  {activeTab === "infrastructure" && <Building className="h-4 w-4 text-gray-600" />}
                  {activeTab === "environmental" && <Leaf className="h-4 w-4 text-green-600" />}
                  {activeTab === "analytics" && <BarChart3 className="h-4 w-4 text-purple-600" />}
                  <span className="font-medium capitalize">
                    {activeTab === "dashboard" ? "Live Dashboard" : activeTab}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activeTab === "dashboard" && "Real-time"}
                  {activeTab === "alerts" && `${filteredAlerts.length} Active`}
                  {activeTab === "infrastructure" && `${filteredInfrastructure.length} Assets`}
                  {activeTab === "environmental" && "4 Systems"}
                  {activeTab === "analytics" && "Performance"}
                </Badge>
              </div>
            </div>

            <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
              {/* Critical Alerts with Enhanced Functionality */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                    Critical Alerts Requiring Immediate Action
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {filteredAlerts
                      .filter((alert) => alert.severity === "HIGH")
                      .map((alert) => {
                        const ThreatIcon = threatIcons[alert.type]
                        const SectorIcon = sectorIcons[alert.sector]
                        const isActiveResponse = activeResponses.some((response) => response.id === alert.id)

                        return (
                          <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
                            <div className="flex items-center gap-2">
                              <ThreatIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                              <SectorIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                              {isActiveResponse && (
                                <Badge variant="destructive" className="animate-pulse text-xs">
                                  🚨 RESPONSE ACTIVE
                                </Badge>
                              )}
                            </div>
                            <AlertTitle className="text-sm sm:text-base">
                              {alert.type.replace("_", " ").toUpperCase()} THREAT - {alert.severity}
                            </AlertTitle>
                            <AlertDescription>
                              <div className="mt-2 space-y-1">
                                <p className="text-xs sm:text-sm">
                                  <strong>Location:</strong> {alert.location}
                                </p>
                                <p className="text-xs sm:text-sm">
                                  <strong>Sector:</strong> {alert.sector.replace("_", " ")}
                                </p>
                                <p className="text-xs sm:text-sm">
                                  <strong>Distance:</strong> {alert.distance} from infrastructure
                                </p>
                                <p className="text-xs sm:text-sm">
                                  <strong>Confidence:</strong> {alert.confidence}%
                                </p>
                                <p className="text-xs sm:text-sm">
                                  <strong>Impact:</strong> {alert.estimatedImpact}
                                </p>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2 mt-3">
                                <Button
                                  className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
                                  onClick={() => handleViewDetails(alert)}
                                  size="sm"
                                >
                                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                  View Details & Location
                                </Button>

                                {isActiveResponse ? (
                                  <Button
                                    className="bg-amber-600 hover:bg-amber-700 text-xs sm:text-sm"
                                    onClick={() => handleDeactivateResponse(alert)}
                                    size="sm"
                                  >
                                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                    Deactivate Response
                                  </Button>
                                ) : (
                                  <Button
                                    className="bg-red-600 hover:bg-red-700 text-xs sm:text-sm"
                                    onClick={() => handleInitiateResponse(alert)}
                                    size="sm"
                                  >
                                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                    Initiate Response
                                  </Button>
                                )}
                              </div>
                            </AlertDescription>
                          </Alert>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>

              {/* Infrastructure Status by Sector with Enhanced Functionality */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      Electricity Sector
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredInfrastructure
                        .filter((asset) => asset.sector === "electricity")
                        .map((asset) => (
                          <Dialog key={asset.id}>
                            <DialogTrigger asChild>
                              <div className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50">
                                <div>
                                  <div className="font-medium text-sm">{asset.id}</div>
                                  <div className="text-xs text-gray-500">
                                    {asset.type} - {asset.location}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Progress value={asset.riskLevel} className="w-12 sm:w-16" />
                                  <Badge
                                    variant={
                                      asset.riskLevel > 70
                                        ? "destructive"
                                        : asset.riskLevel > 40
                                          ? "default"
                                          : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {asset.status}
                                  </Badge>
                                </div>
                              </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl mx-4">
                              <DialogHeader>
                                <DialogTitle className="text-sm sm:text-base">
                                  {asset.id} - {asset.type} Details
                                </DialogTitle>
                                <DialogDescription className="text-xs sm:text-sm">
                                  Comprehensive infrastructure information and operational status
                                </DialogDescription>
                              </DialogHeader>
                              <ScrollArea className="h-64 sm:h-96">
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium mb-2 text-sm">Technical Specifications</h4>
                                      <div className="space-y-2 text-xs sm:text-sm">
                                        {Object.entries(asset.details).map(([key, value]) => (
                                          <div key={key} className="flex justify-between">
                                            <span className="capitalize">{key.replace("_", " ")}:</span>
                                            <span className="font-medium">{value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2 text-sm">Risk Assessment</h4>
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-xs sm:text-sm">Current Risk Level:</span>
                                          <Badge
                                            variant={
                                              asset.riskLevel > 70
                                                ? "destructive"
                                                : asset.riskLevel > 40
                                                  ? "default"
                                                  : "secondary"
                                            }
                                            className="text-xs"
                                          >
                                            {asset.riskLevel}%
                                          </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-xs sm:text-sm">Status:</span>
                                          <span className="font-medium text-xs sm:text-sm">{asset.status}</span>
                                        </div>
                                        <Progress value={asset.riskLevel} className="mt-2" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ScrollArea>
                            </DialogContent>
                          </Dialog>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Fuel className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                      Oil & Gas Sector
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredInfrastructure
                        .filter((asset) => asset.sector === "oil_gas")
                        .map((asset) => (
                          <Dialog key={asset.id}>
                            <DialogTrigger asChild>
                              <div className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50">
                                <div>
                                  <div className="font-medium text-sm">{asset.id}</div>
                                  <div className="text-xs text-gray-500">
                                    {asset.type} - {asset.location}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Progress value={asset.riskLevel} className="w-12 sm:w-16" />
                                  <Badge
                                    variant={
                                      asset.riskLevel > 70
                                        ? "destructive"
                                        : asset.riskLevel > 40
                                          ? "default"
                                          : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {asset.status}
                                  </Badge>
                                </div>
                              </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl mx-4">
                              <DialogHeader>
                                <DialogTitle className="text-sm sm:text-base">
                                  {asset.id} - {asset.type} Details
                                </DialogTitle>
                                <DialogDescription className="text-xs sm:text-sm">
                                  Comprehensive infrastructure information and operational status
                                </DialogDescription>
                              </DialogHeader>
                              <ScrollArea className="h-64 sm:h-96">
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium mb-2 text-sm">Technical Specifications</h4>
                                      <div className="space-y-2 text-xs sm:text-sm">
                                        {Object.entries(asset.details).map(([key, value]) => (
                                          <div key={key} className="flex justify-between">
                                            <span className="capitalize">{key.replace("_", " ")}:</span>
                                            <span className="font-medium">{value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2 text-sm">Risk Assessment</h4>
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-xs sm:text-sm">Current Risk Level:</span>
                                          <Badge
                                            variant={
                                              asset.riskLevel > 70
                                                ? "destructive"
                                                : asset.riskLevel > 40
                                                  ? "default"
                                                  : "secondary"
                                            }
                                            className="text-xs"
                                          >
                                            {asset.riskLevel}%
                                          </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-xs sm:text-sm">Status:</span>
                                          <span className="font-medium text-xs sm:text-sm">{asset.status}</span>
                                        </div>
                                        <Progress value={asset.riskLevel} className="mt-2" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ScrollArea>
                            </DialogContent>
                          </Dialog>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                      Renewable Energy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredInfrastructure
                        .filter((asset) => asset.sector === "renewable")
                        .map((asset) => (
                          <Dialog key={asset.id}>
                            <DialogTrigger asChild>
                              <div className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50">
                                <div>
                                  <div className="font-medium text-sm">{asset.id}</div>
                                  <div className="text-xs text-gray-500">
                                    {asset.type} - {asset.location}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Progress value={asset.riskLevel} className="w-12 sm:w-16" />
                                  <Badge
                                    variant={
                                      asset.riskLevel > 70
                                        ? "destructive"
                                        : asset.riskLevel > 40
                                          ? "default"
                                          : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {asset.status}
                                  </Badge>
                                </div>
                              </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl mx-4">
                              <DialogHeader>
                                <DialogTitle className="text-sm sm:text-base">
                                  {asset.id} - {asset.type} Details
                                </DialogTitle>
                                <DialogDescription className="text-xs sm:text-sm">
                                  Comprehensive infrastructure information and operational status
                                </DialogDescription>
                              </DialogHeader>
                              <ScrollArea className="h-64 sm:h-96">
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium mb-2 text-sm">Technical Specifications</h4>
                                      <div className="space-y-2 text-xs sm:text-sm">
                                        {Object.entries(asset.details).map(([key, value]) => (
                                          <div key={key} className="flex justify-between">
                                            <span className="capitalize">{key.replace("_", " ")}:</span>
                                            <span className="font-medium">{value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2 text-sm">Risk Assessment</h4>
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-xs sm:text-sm">Current Risk Level:</span>
                                          <Badge
                                            variant={
                                              asset.riskLevel > 70
                                                ? "destructive"
                                                : asset.riskLevel > 40
                                                  ? "default"
                                                  : "secondary"
                                            }
                                            className="text-xs"
                                          >
                                            {asset.riskLevel}%
                                          </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-xs sm:text-sm">Status:</span>
                                          <span className="font-medium text-xs sm:text-sm">{asset.status}</span>
                                        </div>
                                        <Progress value={asset.riskLevel} className="mt-2" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ScrollArea>
                            </DialogContent>
                          </Dialog>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm sm:text-base">All Active Alerts</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Complete list of environmental threats and infrastructure alerts across all sectors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {filteredAlerts.map((alert) => {
                      const ThreatIcon = threatIcons[alert.type]
                      const SectorIcon = sectorIcons[alert.sector]
                      const isActiveResponse = activeResponses.some((response) => response.id === alert.id)

                      return (
                        <div
                          key={alert.id}
                          className="border rounded-lg p-3 sm:p-4 hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedAlert(selectedAlert?.id === alert.id ? null : alert)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  alert.severity === "HIGH"
                                    ? "bg-red-500"
                                    : alert.severity === "MEDIUM"
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }`}
                              />
                              <ThreatIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                              <SectorIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                              <div>
                                <div className="font-medium text-sm">
                                  {alert.type.replace("_", " ").toUpperCase()} - {alert.location}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {alert.sector.replace("_", " ")} • Detected: {alert.timeDetected}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2">
                              <Badge
                                variant={alert.severity === "HIGH" ? "destructive" : "default"}
                                className="text-xs"
                              >
                                {alert.severity}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {alert.confidence}% confidence
                              </Badge>
                              {isActiveResponse && (
                                <Badge variant="destructive" className="animate-pulse text-xs">
                                  🚨 ACTIVE
                                </Badge>
                              )}
                            </div>
                          </div>
                          {selectedAlert?.id === alert.id && (
                            <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded">
                              <div className="grid grid-cols-1 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2 text-sm">Impact Assessment:</h4>
                                  <p className="text-xs sm:text-sm text-gray-700">{alert.estimatedImpact}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2 text-sm">Recommended Actions:</h4>
                                  <ul className="list-disc list-inside space-y-1">
                                    {alert.recommendedActions.map((action, idx) => (
                                      <li key={idx} className="text-xs sm:text-sm text-gray-700">
                                        {action}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                                <Button size="sm" onClick={() => handleViewDetails(alert)} className="text-xs">
                                  <MapPin className="h-3 w-3 mr-2" />
                                  Show on Map
                                </Button>

                                {isActiveResponse ? (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDeactivateResponse(alert)}
                                    className="text-xs bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                                  >
                                    <AlertTriangle className="h-3 w-3 mr-2" />
                                    Deactivate Response
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleInitiateResponse(alert)}
                                    className="text-xs"
                                  >
                                    <AlertTriangle className="h-3 w-3 mr-2" />
                                    Execute Response
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="infrastructure" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm sm:text-base">Infrastructure Monitoring Overview</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Comprehensive view of all monitored energy infrastructure across sectors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {filteredInfrastructure.map((asset) => {
                      const SectorIcon = sectorIcons[asset.sector]
                      return (
                        <Dialog key={asset.id}>
                          <DialogTrigger asChild>
                            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                              <CardHeader className="pb-2 sm:pb-3">
                                <CardTitle className="text-sm sm:text-lg flex items-center gap-2">
                                  <SectorIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                  {asset.id}
                                </CardTitle>
                                <CardDescription className="text-xs sm:text-sm">
                                  {asset.type} • {asset.location}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2 sm:space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm">Risk Level</span>
                                    <span className="font-medium text-xs sm:text-sm">{asset.riskLevel}%</span>
                                  </div>
                                  <Progress value={asset.riskLevel} />
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm">Status</span>
                                    <Badge
                                      variant={
                                        asset.riskLevel > 70
                                          ? "destructive"
                                          : asset.riskLevel > 40
                                            ? "default"
                                            : "secondary"
                                      }
                                      className="text-xs"
                                    >
                                      {asset.status}
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm">Sector</span>
                                    <Badge variant="outline" className="text-xs">
                                      {asset.sector.replace("_", " ")}
                                    </Badge>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl mx-4">
                            <DialogHeader>
                              <DialogTitle className="text-sm sm:text-base">
                                {asset.id} - Infrastructure Details
                              </DialogTitle>
                              <DialogDescription className="text-xs sm:text-sm">
                                Complete technical specifications and operational status
                              </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="h-64 sm:h-96">
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-2 text-sm">Technical Specifications</h4>
                                    <div className="space-y-2 text-xs sm:text-sm">
                                      {Object.entries(asset.details).map(([key, value]) => (
                                        <div key={key} className="flex justify-between">
                                          <span className="capitalize">{key.replace("_", " ")}:</span>
                                          <span className="font-medium">{value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2 text-sm">Risk & Status Analysis</h4>
                                    <div className="space-y-3">
                                      <div>
                                        <div className="flex justify-between mb-1">
                                          <span className="text-xs sm:text-sm">Current Risk Level</span>
                                          <span className="text-xs sm:text-sm font-medium">{asset.riskLevel}%</span>
                                        </div>
                                        <Progress value={asset.riskLevel} />
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-xs sm:text-sm">Operational Status:</span>
                                        <Badge
                                          variant={
                                            asset.riskLevel > 70
                                              ? "destructive"
                                              : asset.riskLevel > 40
                                                ? "default"
                                                : "secondary"
                                          }
                                          className="text-xs"
                                        >
                                          {asset.status}
                                        </Badge>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-xs sm:text-sm">Energy Sector:</span>
                                        <Badge variant="outline" className="text-xs">
                                          {asset.sector.replace("_", " ")}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="environmental" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Wind className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                      Air Quality Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Current AQI</span>
                        <span className="text-xl sm:text-2xl font-bold">
                          {mockEnvironmentalData.air_quality.current_aqi}
                        </span>
                      </div>
                      <Progress value={mockEnvironmentalData.air_quality.current_aqi} className="h-2" />
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div>
                          Status: <Badge className="text-xs">{mockEnvironmentalData.air_quality.status}</Badge>
                        </div>
                        <div>
                          Trend:{" "}
                          <Badge variant="outline" className="text-xs">
                            {mockEnvironmentalData.air_quality.trend}
                          </Badge>
                        </div>
                        <div>Sites: {mockEnvironmentalData.air_quality.locations_monitored}</div>
                        <div>Active Alerts: {mockEnvironmentalData.air_quality.alerts_active}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
                      Water Quality Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Compliance Rate</span>
                        <span className="text-xl sm:text-2xl font-bold">
                          {mockEnvironmentalData.water_quality.compliance_rate}%
                        </span>
                      </div>
                      <Progress value={mockEnvironmentalData.water_quality.compliance_rate} className="h-2" />
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div>Sites Monitored: {mockEnvironmentalData.water_quality.sites_monitored}</div>
                        <div>Contamination Events: {mockEnvironmentalData.water_quality.contamination_events}</div>
                        <div>
                          Trend:{" "}
                          <Badge variant="outline" className="text-xs">
                            {mockEnvironmentalData.water_quality.trend}
                          </Badge>
                        </div>
                        <div>
                          Status:{" "}
                          <Badge variant="secondary" className="text-xs">
                            Good
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                      Weather & Climate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Forecast Accuracy</span>
                        <span className="text-xl sm:text-2xl font-bold">
                          {mockEnvironmentalData.weather.forecast_accuracy}%
                        </span>
                      </div>
                      <Progress value={mockEnvironmentalData.weather.forecast_accuracy} className="h-2" />
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div>Coverage: {mockEnvironmentalData.weather.coverage_area}</div>
                        <div>Extreme Events: {mockEnvironmentalData.weather.extreme_events}</div>
                        <div>Early Warnings: {mockEnvironmentalData.weather.early_warnings}</div>
                        <div>
                          Status:{" "}
                          <Badge variant="secondary" className="text-xs">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                      Wildfire Detection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Active Fires</span>
                        <span className="text-xl sm:text-2xl font-bold">
                          {mockEnvironmentalData.wildfire.active_fires}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div>
                          Risk Level:{" "}
                          <Badge variant="destructive" className="text-xs">
                            {mockEnvironmentalData.wildfire.risk_level}
                          </Badge>
                        </div>
                        <div>Detection Time: {mockEnvironmentalData.wildfire.detection_time}</div>
                        <div>Area Monitored: {mockEnvironmentalData.wildfire.area_monitored}</div>
                        <div>
                          Status:{" "}
                          <Badge variant="secondary" className="text-xs">
                            Monitoring
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm sm:text-base">Detection Performance</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      AI model accuracy across threat types
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm">Wildfire Detection</span>
                        <span className="font-medium text-xs sm:text-sm">94.2%</span>
                      </div>
                      <Progress value={94.2} />

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm">Air Quality Prediction</span>
                        <span className="font-medium text-xs sm:text-sm">91.8%</span>
                      </div>
                      <Progress value={91.8} />

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm">Weather Forecasting</span>
                        <span className="font-medium text-xs sm:text-sm">89.5%</span>
                      </div>
                      <Progress value={89.5} />

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm">Water Quality Analysis</span>
                        <span className="font-medium text-xs sm:text-sm">96.1%</span>
                      </div>
                      <Progress value={96.1} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm sm:text-base">Sector Impact Analysis</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Cost savings by energy sector</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm">Electricity</span>
                        <span className="font-medium text-green-600 text-xs sm:text-sm">$2.1M</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm">Oil & Gas</span>
                        <span className="font-medium text-green-600 text-xs sm:text-sm">$1.8M</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm">Renewable</span>
                        <span className="font-medium text-green-600 text-xs sm:text-sm">$0.8M</span>
                      </div>

                      <div className="flex justify-between font-bold border-t pt-2">
                        <span className="text-xs sm:text-sm">Total Savings</span>
                        <span className="text-green-600 text-xs sm:text-sm">$4.7M</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm sm:text-base">Response Metrics</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">System performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm">Avg Response Time</span>
                        <span className="font-medium text-xs sm:text-sm">9 minutes</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm">False Positive Rate</span>
                        <span className="font-medium text-xs sm:text-sm">2.8%</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm">System Uptime</span>
                        <span className="font-medium text-xs sm:text-sm">99.7%</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm">Customer Satisfaction</span>
                        <span className="font-medium text-xs sm:text-sm">4.8/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Demo Notice */}
          <Card className="mt-6 sm:mt-8 border-blue-200 bg-blue-50">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <p className="text-blue-800 text-xs sm:text-sm">
                  <strong>Interactive Platform Demo:</strong> This demonstration showcases a fully responsive AI-powered
                  energy infrastructure + environmental monitoring platform. Navigate using the mobile menu (hamburger icon) on mobile devices
                  or the desktop tabs. Click "View Details & Location" on critical alerts to highlight their location on
                  the interactive map. Use "Initiate Response" to activate professional emergency response protocols
                  with real emergency contacts, resource deployment, and comprehensive procedures. The platform tracks
                  active responses and provides complete incident management capabilities for energy infrastructure
                  protection across Canada.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
