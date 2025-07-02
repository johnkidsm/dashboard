"use client"

import { useState } from "react"
import Image from "next/image"
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
import { ThemeToggle } from "@/components/theme-toggle"
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
  Bot,
  DrillIcon as Drone,
  Battery,
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

const mockRobots = [
  {
    id: "AD-001",
    type: "Aerial Drone",
    model: "DJI Matrice 300 RTK",
    status: "Patrolling",
    battery: 82,
    location: "T-401 Corridor, BC",
    mission: "Thermal imaging for wildfire hotspots",
    flightTime: "2h 15m",
    dataCollected: "1.2 GB",
  },
  {
    id: "GR-001",
    type: "Ground Robot",
    model: "Boston Dynamics Spot",
    status: "Charging",
    battery: 23,
    location: "R-105 Refinery, AB",
    mission: "Awaiting deployment for gas leak detection",
    uptime: "18h 45m",
    dataCollected: "350 MB",
  },
  {
    id: "AD-002",
    type: "Aerial Drone",
    model: "WingtraOne GEN II",
    status: "Returning to Base",
    battery: 34,
    location: "H-203 Dam, QC",
    mission: "Completed structural integrity scan",
    flightTime: "4h 30m",
    dataCollected: "4.5 GB",
  },
  {
    id: "GR-002",
    type: "Ground Robot",
    model: "ANYbotics ANYmal",
    status: "Standby",
    battery: 95,
    location: "P-450 Pipeline, AB",
    mission: "Ready for emergency pipeline inspection",
    uptime: "72h 10m",
    dataCollected: "120 MB",
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
    <div className="relative w-full h-64 sm:h-80 md:h-96 bg-card rounded-lg overflow-hidden border">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-800 from-slate-200 to-slate-100">
        {/* Canada outline representation */}
        <svg className="w-full h-full opacity-10" viewBox="0 0 800 400">
          <path
            d="M100 200 Q200 150 300 180 Q400 160 500 190 Q600 170 700 200 Q650 250 600 280 Q500 300 400 290 Q300 310 200 280 Q150 250 100 200"
            className="fill-sky-500 stroke-sky-600"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Province Labels */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 sm:top-16 sm:left-16 text-xs font-medium text-muted-foreground">BC</div>
        <div className="absolute top-10 left-16 sm:top-20 sm:left-32 text-xs font-medium text-muted-foreground">AB</div>
        <div className="absolute top-12 left-24 sm:top-24 sm:left-48 text-xs font-medium text-muted-foreground">SK</div>
        <div className="absolute top-10 right-16 sm:top-20 sm:right-32 text-xs font-medium text-muted-foreground">
          ON
        </div>
        <div className="absolute top-8 right-8 sm:top-16 sm:right-16 text-xs font-medium text-muted-foreground">QC</div>
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
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-card/80 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-lg border">
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
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-card/80 backdrop-blur-sm p-1 sm:p-2 rounded-lg shadow-lg border">
        <div className="flex flex-col gap-1 sm:gap-2">
          <Button size="sm" variant="outline" className="text-xs h-6 sm:h-8 bg-card/50 hover:bg-accent">
            <Layers className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
            <span className="hidden sm:inline">Layers</span>
          </Button>
          <Button size="sm" variant="outline" className="text-xs h-6 sm:h-8 bg-card/50 hover:bg-accent">
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
            <div className="bg-muted p-3 sm:p-4 rounded-lg">
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
                      selectedContacts.includes(contact) ? "bg-blue-500/10 border-blue-500/30" : "hover:bg-muted"
                    }`}
                    onClick={() => toggleContact(contact)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{contact.role}</div>
                        <div className="text-xs text-muted-foreground">{contact.name}</div>
                        <div className="text-xs text-blue-600">{contact.phone}</div>
                      </div>
                      <div className="flex gap-1 sm:gap-2">
                        <Button size="sm" variant="outline" className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-transparent">
                          <Phone className="h-2 w-2 sm:h-3 sm:w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-transparent">
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
                      selectedResources.includes(resource) ? "bg-green-500/10 border-green-500/30" : "hover:bg-muted"
                    }`}
                    onClick={() => toggleResource(resource)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{resource.type}</div>
                        <div className="text-xs text-muted-foreground">{resource.units}</div>
                        <div className="text-xs text-orange-600">ETA: {resource.eta}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {isDeactivating ? "Recall" : "Ready"}
                        </Badge>
                        <Button size="sm" variant="outline" className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-transparent">
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
                      <div key={idx} className="flex items-center gap-3 p-2 bg-muted rounded">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </div>
                        <span className="text-xs sm:text-sm">{procedure}</span>
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 ml-auto" />
                      </div>
                    ))
                  : // Regular response procedures
                    alert.responseProtocol.procedures.map((procedure, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-muted rounded">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold">
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

                <Button variant="outline" onClick={onClose} className="text-xs sm:text-sm bg-transparent">
                  Close
                </Button>
              </div>

              {(selectedContacts.length === 0 || selectedResources.length === 0) &&
                responseStatus === "preparing" &&
                !isDeactivating && (
                  <p className="text-xs text-muted-foreground mt-2">
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
  autonomousUnits: 4,
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
      return "text-red-400 bg-red-900/20 border-red-500/30"
    case "MEDIUM":
      return "text-yellow-400 bg-yellow-900/20 border-yellow-500/30"
    case "LOW":
      return "text-green-400 bg-green-900/20 border-green-500/30"
    default:
      return "text-slate-400 bg-slate-800/20 border-slate-700"
  }
}

// Mobile Navigation Component
const MobileNav = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "infrastructure", label: "Infrastructure", icon: Building },
    { id: "robotics", label: "Robotics", icon: Bot },
    { id: "environmental", label: "Environmental", icon: Leaf },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-card/80 backdrop-blur-sm shadow-lg"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-card border-r shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Navigation</h2>
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
                    activeTab === item.id
                      ? "bg-sky-500/20 text-sky-500 dark:text-sky-400 font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
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

export default function EnergyEminenceComprehensive() {
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
    <div className="min-h-screen bg-background text-foreground futuristic-bg">
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
              <div className="flex items-center gap-4">
                <Image
                  src="/kraftgene-logo.jpeg"
                  alt="KraftGene AI Logo"
                  width={60}
                  height={60}
                  className="rounded-md"
                />
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 flex items-center gap-3">
                    EnergyEminence
                  </h1>
                  <p className="text-sm sm:text-lg md:text-xl text-muted-foreground">
                    Predictive Environmental & Infrastructure Intelligence
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-left sm:text-right">
                  <div className="text-xs sm:text-sm text-muted-foreground">Live Monitoring</div>
                  <div className="text-sm sm:text-lg font-semibold text-green-500 dark:text-green-400 flex items-center justify-start sm:justify-end gap-2">
                    <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" />
                    All Systems Active
                  </div>
                  {activeResponses.length > 0 && (
                    <div className="text-xs sm:text-sm text-red-500 dark:text-red-400 font-medium mt-1">
                      🚨 {activeResponses.length} Active Emergency Response{activeResponses.length > 1 ? "s" : ""}
                    </div>
                  )}
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Enhanced Key Metrics with Click Functionality */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer bg-card/80 hover:bg-accent border transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                      Threats Detected
                    </CardTitle>
                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500 dark:text-orange-400" />
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
                          <span className="font-medium text-green-500 dark:text-green-400 text-sm">
                            {detailedMetrics.threatsDetected.accuracy}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Trend</span>
                          <span className="font-medium text-green-500 dark:text-green-400 text-sm">
                            {detailedMetrics.threatsDetected.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Card className="bg-card/80 hover:bg-accent border transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Infrastructure</CardTitle>
                <Factory className="h-3 w-3 sm:h-4 sm:w-4 text-sky-500 dark:text-sky-400" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg sm:text-2xl font-bold">{mockMetrics.infrastructureMonitored}</div>
                <p className="text-xs text-muted-foreground">Assets monitored</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 hover:bg-accent border transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Response Time</CardTitle>
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 dark:text-green-400" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg sm:text-2xl font-bold">{mockMetrics.avgResponseTime}</div>
                <p className="text-xs text-muted-foreground">Avg detection to alert</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 hover:bg-accent border transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Cost Savings</CardTitle>
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500 dark:text-purple-400" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg sm:text-2xl font-bold">{mockMetrics.costSavings}</div>
                <p className="text-xs text-muted-foreground">Prevented losses</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 hover:bg-accent border transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Compliance</CardTitle>
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-500 dark:text-indigo-400" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg sm:text-2xl font-bold">{mockMetrics.environmentalCompliance}</div>
                <p className="text-xs text-muted-foreground">Environmental</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 hover:bg-accent border transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Autonomous Units</CardTitle>
                <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-teal-500 dark:text-teal-400" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg sm:text-2xl font-bold">{mockMetrics.autonomousUnits}</div>
                <p className="text-xs text-muted-foreground">Drones & Robots</p>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Map Section */}
          <Card className="mb-4 sm:mb-6 md:mb-8 bg-transparent border-0" data-map="true">
            <CardHeader className="px-0">
              <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500 dark:text-sky-400" />
                Real-Time Threat & Infrastructure Map
                {highlightedAlert && (
                  <Badge variant="destructive" className="ml-2 animate-pulse text-xs">
                    🎯 Showing: {highlightedAlert.location}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                Interactive map showing live alerts and infrastructure status across Canada
                {highlightedAlert && " - Click on the highlighted marker for incident details"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <InteractiveMap
                alerts={mockAlerts}
                infrastructure={mockInfrastructure}
                selectedSector={selectedSector}
                selectedThreat={selectedThreat}
                onMarkerClick={handleMapMarkerClick}
                highlightedAlert={highlightedAlert}
              />
              {highlightedAlert && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                      <span className="font-medium text-yellow-600 dark:text-yellow-300 text-sm">
                        Incident Location Highlighted: {highlightedAlert.location}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setHighlightedAlert(null)}
                      className="bg-card/50 hover:bg-accent"
                    >
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
                          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
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

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-full sm:w-48 bg-card/80 border">
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
              <SelectTrigger className="w-full sm:w-48 bg-card/80 border">
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
            <TabsList className="hidden md:grid w-full grid-cols-6 h-12 bg-card/80 border">
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2 data-[state=active]:bg-sky-500/20 data-[state=active]:text-sky-500 dark:data-[state=active]:text-sky-400"
              >
                <Home className="h-4 w-4" />
                <span className="hidden lg:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger
                value="alerts"
                className="flex items-center gap-2 data-[state=active]:bg-sky-500/20 data-[state=active]:text-sky-500 dark:data-[state=active]:text-sky-400"
              >
                <Bell className="h-4 w-4" />
                <span className="hidden lg:inline">Alerts</span>
              </TabsTrigger>
              <TabsTrigger
                value="infrastructure"
                className="flex items-center gap-2 data-[state=active]:bg-sky-500/20 data-[state=active]:text-sky-500 dark:data-[state=active]:text-sky-400"
              >
                <Building className="h-4 w-4" />
                <span className="hidden lg:inline">Infrastructure</span>
              </TabsTrigger>
              <TabsTrigger
                value="robotics"
                className="flex items-center gap-2 data-[state=active]:bg-sky-500/20 data-[state=active]:text-sky-500 dark:data-[state=active]:text-sky-400"
              >
                <Bot className="h-4 w-4" />
                <span className="hidden lg:inline">Robotics</span>
              </TabsTrigger>
              <TabsTrigger
                value="environmental"
                className="flex items-center gap-2 data-[state=active]:bg-sky-500/20 data-[state=active]:text-sky-500 dark:data-[state=active]:text-sky-400"
              >
                <Leaf className="h-4 w-4" />
                <span className="hidden lg:inline">Environmental</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center gap-2 data-[state=active]:bg-sky-500/20 data-[state=active]:text-sky-500 dark:data-[state=active]:text-sky-400"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden lg:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>

            {/* Mobile Tab Indicator */}
            <div className="md:hidden bg-card/80 rounded-lg p-3 shadow-sm border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {activeTab === "dashboard" && <Home className="h-4 w-4 text-sky-500 dark:text-sky-400" />}
                  {activeTab === "alerts" && <Bell className="h-4 w-4 text-red-500 dark:text-red-400" />}
                  {activeTab === "infrastructure" && <Building className="h-4 w-4 text-muted-foreground" />}
                  {activeTab === "robotics" && <Bot className="h-4 w-4 text-teal-500 dark:text-teal-400" />}
                  {activeTab === "environmental" && <Leaf className="h-4 w-4 text-green-500 dark:text-green-400" />}
                  {activeTab === "analytics" && <BarChart3 className="h-4 w-4 text-purple-500 dark:text-purple-400" />}
                  <span className="font-medium capitalize">
                    {activeTab === "dashboard" ? "Live Dashboard" : activeTab}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activeTab === "dashboard" && "Real-time"}
                  {activeTab === "alerts" && `${filteredAlerts.length} Active`}
                  {activeTab === "infrastructure" && `${filteredInfrastructure.length} Assets`}
                  {activeTab === "robotics" && `${mockRobots.length} Units`}
                  {activeTab === "environmental" && "4 Systems"}
                  {activeTab === "analytics" && "Performance"}
                </Badge>
              </div>
            </div>

            <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
              {/* Critical Alerts with Enhanced Functionality */}
              <Card className="bg-card/80 border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 dark:text-red-400" />
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
                          <Alert
                            key={alert.id}
                            className="dark:text-red-400 dark:bg-red-900/20 dark:border-red-500/30 text-red-600 bg-red-50 border-red-200"
                          >
                            <div className="flex items-center gap-2">
                              <ThreatIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                              <SectorIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                              {isActiveResponse && (
                                <Badge variant="destructive" className="animate-pulse text-xs">
                                  🚨 RESPONSE ACTIVE
                                </Badge>
                              )}
                            </div>
                            <AlertTitle className="text-sm sm:text-base text-foreground">
                              {alert.type.replace("_", " ").toUpperCase()} THREAT - {alert.severity}
                            </AlertTitle>
                            <AlertDescription className="text-muted-foreground">
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
                                  className="bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm"
                                  onClick={() => handleViewDetails(alert)}
                                  size="sm"
                                >
                                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                  View Details & Location
                                </Button>

                                {isActiveResponse ? (
                                  <Button
                                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm"
                                    onClick={() => handleDeactivateResponse(alert)}
                                    size="sm"
                                  >
                                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                    Deactivate Response
                                  </Button>
                                ) : (
                                  <Button
                                    className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm"
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
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4 sm:space-y-6">
              <Card className="bg-card/80 border">
                <CardHeader>
                  <CardTitle className="text-sm sm:text-base">All Active Alerts</CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-muted-foreground">
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
                          className="border rounded-lg p-3 sm:p-4 hover:bg-accent cursor-pointer"
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
                                <div className="text-xs text-muted-foreground">
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
                            <div className="mt-4 p-3 sm:p-4 bg-muted rounded">
                              <div className="grid grid-cols-1 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2 text-sm">Impact Assessment:</h4>
                                  <p className="text-xs sm:text-sm text-muted-foreground">{alert.estimatedImpact}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2 text-sm">Recommended Actions:</h4>
                                  <ul className="list-disc list-inside space-y-1">
                                    {alert.recommendedActions.map((action, idx) => (
                                      <li key={idx} className="text-xs sm:text-sm text-muted-foreground">
                                        {action}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                                <Button
                                  size="sm"
                                  onClick={() => handleViewDetails(alert)}
                                  className="text-xs bg-sky-600 hover:bg-sky-700 text-white"
                                >
                                  <MapPin className="h-3 w-3 mr-2" />
                                  Show on Map
                                </Button>

                                {isActiveResponse ? (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDeactivateResponse(alert)}
                                    className="text-xs bg-amber-500/20 text-amber-500 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/30"
                                  >
                                    <AlertTriangle className="h-3 w-3 mr-2" />
                                    Deactivate Response
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleInitiateResponse(alert)}
                                    className="text-xs bg-red-500/20 text-red-500 dark:text-red-300 border-red-500/30 hover:bg-red-500/30"
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
              <Card className="bg-card/80 border">
                <CardHeader>
                  <CardTitle className="text-sm sm:text-base">Infrastructure Monitoring Overview</CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-muted-foreground">
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
                            <Card className="cursor-pointer bg-background hover:bg-accent border transition-colors">
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
                                    <span className="text-xs sm:text-sm text-muted-foreground">Risk Level</span>
                                    <span className="font-medium text-xs sm:text-sm">{asset.riskLevel}%</span>
                                  </div>
                                  <Progress value={asset.riskLevel} />
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm text-muted-foreground">Status</span>
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
                                    <span className="text-xs sm:text-sm text-muted-foreground">Sector</span>
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

            <TabsContent value="robotics" className="space-y-4 sm:space-y-6">
              <Card className="bg-card/80 border">
                <CardHeader>
                  <CardTitle className="text-sm sm:text-base">Autonomous Data Collection</CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                    Live status of deployed drones and ground robots for field data acquisition.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockRobots.map((robot) => {
                      const RobotIcon = robot.type === "Aerial Drone" ? Drone : Bot
                      const batteryColor =
                        robot.battery > 70 ? "text-green-500" : robot.battery > 30 ? "text-yellow-500" : "text-red-500"
                      return (
                        <Card key={robot.id} className="bg-background border">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base flex items-center gap-2">
                                <RobotIcon className="h-5 w-5" />
                                {robot.id} - {robot.type}
                              </CardTitle>
                              <Badge
                                variant={robot.status === "Patrolling" ? "default" : "secondary"}
                                className={
                                  robot.status === "Patrolling"
                                    ? "bg-sky-500/20 text-sky-500 dark:text-sky-400"
                                    : robot.status === "Charging"
                                      ? "bg-yellow-500/20 text-yellow-500 dark:text-yellow-400"
                                      : ""
                                }
                              >
                                {robot.status}
                              </Badge>
                            </div>
                            <CardDescription>{robot.model}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Battery</span>
                              <div className="flex items-center gap-2 font-medium">
                                <Battery className={`h-4 w-4 ${batteryColor}`} />
                                {robot.battery}%
                              </div>
                            </div>
                            <Progress value={robot.battery} />
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Location</span>
                              <span className="font-medium">{robot.location}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Mission</span>
                              <span className="font-medium text-right">{robot.mission}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                {robot.type === "Aerial Drone" ? "Flight Time" : "Uptime"}
                              </span>
                              <span className="font-medium">
                                {robot.type === "Aerial Drone" ? robot.flightTime : robot.uptime}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="environmental" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-card/80 border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Wind className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500 dark:text-sky-400" />
                      Air Quality Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current AQI</span>
                        <span className="text-xl sm:text-2xl font-bold">
                          {mockEnvironmentalData.air_quality.current_aqi}
                        </span>
                      </div>
                      <Progress value={mockEnvironmentalData.air_quality.current_aqi} className="h-2" />
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
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

                <Card className="bg-card/80 border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500 dark:text-cyan-400" />
                      Water Quality Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Compliance Rate</span>
                        <span className="text-xl sm:text-2xl font-bold">
                          {mockEnvironmentalData.water_quality.compliance_rate}%
                        </span>
                      </div>
                      <Progress value={mockEnvironmentalData.water_quality.compliance_rate} className="h-2" />
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
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
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card className="bg-card/80 border">
                  <CardHeader>
                    <CardTitle className="text-sm sm:text-base">Detection Performance</CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                      AI model accuracy across threat types
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-muted-foreground">Wildfire Detection</span>
                        <span className="font-medium text-xs sm:text-sm">94.2%</span>
                      </div>
                      <Progress value={94.2} />

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-muted-foreground">Air Quality Prediction</span>
                        <span className="font-medium text-xs sm:text-sm">91.8%</span>
                      </div>
                      <Progress value={91.8} />

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-muted-foreground">Weather Forecasting</span>
                        <span className="font-medium text-xs sm:text-sm">89.5%</span>
                      </div>
                      <Progress value={89.5} />

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-muted-foreground">Water Quality Analysis</span>
                        <span className="font-medium text-xs sm:text-sm">96.1%</span>
                      </div>
                      <Progress value={96.1} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Demo Notice */}
          <Card className="mt-6 sm:mt-8 border-sky-500/30 bg-sky-500/10 dark:bg-sky-900/20">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sky-500 dark:bg-sky-400 rounded-full animate-pulse" />
                <p className="text-sky-800 dark:text-sky-300 text-xs sm:text-sm">
                  <strong>Interactive Platform Demo:</strong> This demonstration showcases a fully responsive AI-powered
                  platform for integrated energy, environmental, and robotics monitoring. Use the theme switcher in the
                  top right to toggle between light and dark modes. Navigate using the mobile menu (hamburger icon) or
                  desktop tabs. Explore the new 'Robotics' tab to see live data from autonomous drones and ground
                  robots. Click "View Details & Location" on critical alerts to highlight them on the map, and use
                  "Initiate Response" to activate professional emergency protocols.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
