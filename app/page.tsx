"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import * as d3 from "d3"

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
    coordinates: { lat: 55, lng: -125 },
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
    coordinates: { lat: 55, lng: -115 },
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
    coordinates: { lat: 50, lng: -70 },
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
]

const mockInfrastructure = [
  {
    id: "T-401",
    type: "Transmission Line",
    sector: "electricity",
    status: "At Risk",
    riskLevel: 85,
    location: "BC",
    coordinates: { lat: 55, lng: -125 },
  },
  {
    id: "R-105",
    type: "Oil Refinery",
    sector: "oil_gas",
    status: "Monitoring",
    riskLevel: 65,
    location: "AB",
    coordinates: { lat: 55, lng: -115 },
  },
  {
    id: "H-203",
    type: "Hydro Dam",
    sector: "renewable",
    status: "Alert",
    riskLevel: 78,
    location: "QC",
    coordinates: { lat: 50, lng: -70 },
  },
]

const mockRobotics = [
  {
    id: "Drone-Alpha-01",
    type: "Aerial Drone",
    status: "Active",
    mission: "Wildfire Perimeter Scan",
    location: "Near T-401, BC",
    battery: 78,
    dataCollected: "Thermal, Multispectral",
    flightTime: "42 min",
  },
  {
    id: "Quad-Bravo-03",
    type: "Quadruped Robot",
    status: "Standby",
    mission: "Pipeline Integrity Check",
    location: "Pipeline P-450 Staging Area, AB",
    battery: 95,
    dataCollected: "Gas, Lidar",
    lastActivity: "2 hours ago",
  },
  {
    id: "Drone-Charlie-02",
    type: "Aerial Drone",
    status: "Returning",
    mission: "Air Quality Sampling",
    location: "En route to Refinery R-105, AB",
    battery: 23,
    dataCollected: "Air Particulates",
    flightTime: "87 min",
  },
]

// Enhanced Interactive Map Component with D3 and GeoJSON
const InteractiveMap = ({ alerts, infrastructure, onMarkerClick, highlightedAlert }) => {
  const [geoData, setGeoData] = useState(null)
  const width = 800
  const height = 600

  useEffect(() => {
    fetch("/canada.json")
      .then((response) => response.json())
      .then((data) => {
        setGeoData(data)
      })
  }, [])

  if (!geoData) {
    return (
      <div className="relative w-full h-64 sm:h-80 md:h-96 bg-slate-900/50 rounded-lg border border-slate-700 flex items-center justify-center">
        <p>Loading Map...</p>
      </div>
    )
  }

  const projection = d3.geoMercator().fitSize([width, height], geoData)
  const pathGenerator = d3.geoPath().projection(projection)

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
    <div className="relative w-full h-64 sm:h-80 md:h-96 bg-background rounded-lg overflow-hidden border">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <g>
          {geoData.features.map((feature, i) => (
            <path
              key={i}
              d={pathGenerator(feature)}
              className="fill-muted-foreground/10 stroke-border"
              strokeWidth="0.5"
            />
          ))}
        </g>
        <g>
          {infrastructure.map((asset) => {
            const [x, y] = projection([asset.coordinates.lng, asset.coordinates.lat])
            return (
              <foreignObject key={`infra-${asset.id}`} x={x - 10} y={y - 10} width="20" height="20">
                <div
                  className="w-5 h-5 rounded border-2 border-white shadow-lg flex items-center justify-center text-xs cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: getRiskColor(asset.riskLevel) }}
                  title={`${asset.id} - ${asset.type}`}
                  onClick={() => onMarkerClick("infrastructure", asset)}
                >
                  <span className="text-xs">{getSectorIcon(asset.sector)}</span>
                </div>
              </foreignObject>
            )
          })}
        </g>
        <g>
          {alerts.map((alert) => {
            const [x, y] = projection([alert.coordinates.lng, alert.coordinates.lat])
            const isHighlighted = highlightedAlert && highlightedAlert.id === alert.id
            return (
              <foreignObject
                key={`alert-${alert.id}`}
                x={x - (isHighlighted ? 15 : 12)}
                y={y - (isHighlighted ? 15 : 12)}
                width={isHighlighted ? 30 : 24}
                height={isHighlighted ? 30 : 24}
                className={`transition-all duration-300 ${isHighlighted ? "z-20" : "z-10"}`}
              >
                <div
                  className={`w-full h-full rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold cursor-pointer ${
                    isHighlighted ? "animate-bounce border-4 border-yellow-400" : "animate-pulse"
                  }`}
                  style={{ backgroundColor: getSeverityColor(alert.severity) }}
                  title={`${alert.type.replace("_", " ").toUpperCase()} - ${alert.location}`}
                  onClick={() => onMarkerClick("alert", alert)}
                >
                  <span className="text-sm">{getThreatIcon(alert.type)}</span>
                </div>
              </foreignObject>
            )
          })}
        </g>
      </svg>
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

                <Button variant="outline" onClick={onClose} className="text-xs sm:text-sm bg-transparent">
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
          className="bg-slate-800/80 backdrop-blur-sm border-slate-700 shadow-lg"
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
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-white">Navigation</h2>
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
                      ? "bg-sky-500/20 text-sky-400 font-medium"
                      : "text-slate-300 hover:bg-slate-800"
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

export default function EnergyEminenceDashboard() {
  const [isDeactivating, setIsDeactivating] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedSector, setSelectedSector] = useState("all")
  const [selectedThreat, setSelectedThreat] = useState("all")
  const [selectedAlert, setSelectedAlert] = useState(null)
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

  const handleViewDetails = (alert) => {
    setHighlightedAlert(alert)
    const mapElement = document.querySelector('[data-map="true"]')
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleInitiateResponse = (alert) => {
    setResponseAlert(alert)
    setResponseDialogOpen(true)
    setIsDeactivating(false)
  }

  const handleDeactivateResponse = (alert) => {
    setResponseAlert(alert)
    setResponseDialogOpen(true)
    setIsDeactivating(true)
  }

  const handleResponseInitiated = (alert) => {
    setActiveResponses((prev) => [...prev.filter((a) => a.id !== alert.id), alert])
    setResponseDialogOpen(false)
    setResponseAlert(null)
    window.alert(
      `🚨 EMERGENCY RESPONSE ACTIVATED for ${alert.type.replace("_", " ").toUpperCase()} at ${alert.location}\n\n✅ All emergency contacts notified\n✅ Response teams deployed\n✅ Protocols activated`,
    )
  }

  const handleResponseDeactivated = (alert) => {
    setActiveResponses((prev) => prev.filter((a) => a.id !== alert.id))
    setResponseDialogOpen(false)
    setResponseAlert(null)
    setIsDeactivating(false)
    window.alert(
      `✅ EMERGENCY RESPONSE DEACTIVATED for ${alert.type.replace("_", " ").toUpperCase()} at ${alert.location}\n\n✅ All teams recalled\n✅ Incident closed\n✅ Normal operations resumed`,
    )
  }

  const handleMapMarkerClick = (type, item) => {
    setSelectedMapItem({ type, item })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={mobileNavOpen}
        setIsOpen={setMobileNavOpen}
      />

      <div className="p-2 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-4 sm:mb-6 md:mb-8 mt-12 md:mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image src="/logo.jpeg" alt="KraftGene AI Logo" width={50} height={50} className="rounded-md" />
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-1 sm:mb-2">
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
                  <div className="text-sm sm:text-lg font-semibold text-green-400 flex items-center justify-start sm:justify-end gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    All Systems Active
                  </div>
                  {activeResponses.length > 0 && (
                    <div className="text-xs sm:text-sm text-red-400 font-medium mt-1">
                      🚨 {activeResponses.length} Active Emergency Response{activeResponses.length > 1 ? "s" : ""}
                    </div>
                  )}
                </div>
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Enhanced Key Metrics with Click Functionality */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer bg-slate-800/50 hover:bg-slate-800 border-slate-700 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Threats Detected</CardTitle>
                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold text-white">{mockMetrics.threatsDetected}</div>
                    <p className="text-xs text-slate-400">Last 30 days</p>
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
                          <span className="font-medium text-green-400 text-sm">
                            {detailedMetrics.threatsDetected.accuracy}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Trend</span>
                          <span className="font-medium text-green-400 text-sm">
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
                <Card className="cursor-pointer bg-slate-800/50 hover:bg-slate-800 border-slate-700 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Infrastructure</CardTitle>
                    <Factory className="h-3 w-3 sm:h-4 sm:w-4 text-sky-400" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold text-white">
                      {mockMetrics.infrastructureMonitored}
                    </div>
                    <p className="text-xs text-slate-400">Assets monitored</p>
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
                          <span className="font-medium text-green-400 text-sm">
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
                <Card className="cursor-pointer bg-slate-800/50 hover:bg-slate-800 border-slate-700 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Response Time</CardTitle>
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold text-white">{mockMetrics.avgResponseTime}</div>
                    <p className="text-xs text-slate-400">Avg detection to alert</p>
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
                          <span className="font-medium text-green-400 text-sm">
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
                <Card className="cursor-pointer bg-slate-800/50 hover:bg-slate-800 border-slate-700 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Cost Savings</CardTitle>
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold text-white">{mockMetrics.costSavings}</div>
                    <p className="text-xs text-slate-400">Prevented losses</p>
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
                            <span className="font-medium text-green-400 text-sm">{amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">ROI Analysis</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">ROI</span>
                          <span className="font-medium text-green-400 text-sm">{detailedMetrics.costSavings.roi}</span>
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
              className="cursor-pointer bg-slate-800/50 hover:bg-slate-800 border-slate-700 transition-colors"
              onClick={() => setActiveTab("environmental")}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Compliance</CardTitle>
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-400" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg sm:text-2xl font-bold text-white">{mockMetrics.environmentalCompliance}</div>
                <p className="text-xs text-slate-400">Environmental compliance</p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer bg-slate-800/50 hover:bg-slate-800 border-slate-700 transition-colors"
              onClick={() => setActiveTab("infrastructure")}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Sectors</CardTitle>
                <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-teal-400" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg sm:text-2xl font-bold text-white">{mockMetrics.sectorsMonitored}</div>
                <p className="text-xs text-slate-400">Energy sectors</p>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Map Section */}
          <Card className="mb-4 sm:mb-6 md:mb-8 bg-transparent border-0" data-map="true">
            <CardHeader className="px-0">
              <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-white">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-sky-400" />
                Real-Time Threat & Infrastructure Map
                {highlightedAlert && (
                  <Badge variant="destructive" className="ml-2 animate-pulse text-xs">
                    🎯 Showing: {highlightedAlert.location}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-slate-400">
                Interactive map showing live alerts and infrastructure status across Canada
                {highlightedAlert && " - Click on the highlighted marker for incident details"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <InteractiveMap
                alerts={mockAlerts}
                infrastructure={mockInfrastructure}
                onMarkerClick={handleMapMarkerClick}
                highlightedAlert={highlightedAlert}
              />
              {highlightedAlert && (
                <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/40 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <span className="font-medium text-yellow-300 text-sm">
                        Incident Location Highlighted: {highlightedAlert.location}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setHighlightedAlert(null)}
                      className="bg-slate-700/50 hover:bg-slate-700"
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
                            {Object.entries(selectedMapItem.item.details ?? {}).map(([key, value]) => (
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
                <Card className="cursor-pointer bg-slate-800/50 hover:bg-slate-800 border-slate-700 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Air Quality</CardTitle>
                    <Wind className="h-3 w-3 sm:h-4 sm:w-4 text-sky-400" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold text-white">
                      {mockEnvironmentalData.air_quality.current_aqi}
                    </div>
                    <p className="text-xs text-slate-400">AQI - {mockEnvironmentalData.air_quality.status}</p>
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
                <Card className="cursor-pointer bg-slate-800/50 hover:bg-slate-800 border-slate-700 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Water Quality</CardTitle>
                    <Droplets className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold text-white">
                      {mockEnvironmentalData.water_quality.compliance_rate}%
                    </div>
                    <p className="text-xs text-slate-400">Compliance Rate</p>
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
                <Card className="cursor-pointer bg-slate-800/50 hover:bg-slate-800 border-slate-700 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Weather Monitoring</CardTitle>
                    <Thermometer className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold text-white">
                      {mockEnvironmentalData.weather.forecast_accuracy}%
                    </div>
                    <p className="text-xs text-slate-400">Forecast Accuracy</p>
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
                <Card className="cursor-pointer bg-slate-800/50 hover:bg-slate-800 border-slate-700 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Wildfire Detection</CardTitle>
                    <Flame className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg sm:text-2xl font-bold text-white">
                      {mockEnvironmentalData.wildfire.detection_time}
                    </div>
                    <p className="text-xs text-slate-400">Avg Detection Time</p>
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
              <SelectTrigger className="w-full sm:w-48 bg-slate-800/50 border-slate-700">
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
              <SelectTrigger className="w-full sm:w-48 bg-slate-800/50 border-slate-700">
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
            <TabsList className="hidden md:grid w-full grid-cols-6 h-12 bg-muted/50 border">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Home className="h-4 w-4" /> Dashboard
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <Bell className="h-4 w-4" /> Alerts
              </TabsTrigger>
              <TabsTrigger value="infrastructure" className="flex items-center gap-2">
                <Building className="h-4 w-4" /> Infrastructure
              </TabsTrigger>
              <TabsTrigger value="autonomous" className="flex items-center gap-2">
                <Bot className="h-4 w-4" /> Autonomous Systems
              </TabsTrigger>
              <TabsTrigger value="environmental" className="flex items-center gap-2">
                <Leaf className="h-4 w-4" /> Environmental
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" /> Analytics
              </TabsTrigger>
            </TabsList>

            {/* Mobile Tab Indicator */}
            <div className="md:hidden bg-slate-800/50 rounded-lg p-3 shadow-sm border border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {activeTab === "dashboard" && <Home className="h-4 w-4 text-sky-400" />}
                  {activeTab === "alerts" && <Bell className="h-4 w-4 text-red-400" />}
                  {activeTab === "infrastructure" && <Building className="h-4 w-4 text-slate-400" />}
                  {activeTab === "environmental" && <Leaf className="h-4 w-4 text-green-400" />}
                  {activeTab === "analytics" && <BarChart3 className="h-4 w-4 text-purple-400" />}
                  <span className="font-medium capitalize text-white">
                    {activeTab === "dashboard" ? "Live Dashboard" : activeTab}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
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
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base text-white">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
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
                            <AlertTitle className="text-sm sm:text-base text-white">
                              {alert.type.replace("_", " ").toUpperCase()} THREAT - {alert.severity}
                            </AlertTitle>
                            <AlertDescription className="text-slate-300">
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

              {/* Infrastructure Status by Sector with Enhanced Functionality */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base text-white">
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-sky-400" />
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
                              <div className="flex items-center justify-between p-3 border border-slate-700 rounded cursor-pointer hover:bg-slate-800">
                                <div>
                                  <div className="font-medium text-sm text-white">{asset.id}</div>
                                  <div className="text-xs text-slate-400">
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
                                        {Object.entries(asset.details ?? {}).map(([key, value]) => (
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

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base text-white">
                      <Fuel className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
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
                              <div className="flex items-center justify-between p-3 border border-slate-700 rounded cursor-pointer hover:bg-slate-800">
                                <div>
                                  <div className="font-medium text-sm text-white">{asset.id}</div>
                                  <div className="text-xs text-slate-400">
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
                                        {Object.entries(asset.details ?? {}).map(([key, value]) => (
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

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base text-white">
                      <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
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
                              <div className="flex items-center justify-between p-3 border border-slate-700 rounded cursor-pointer hover:bg-slate-800">
                                <div>
                                  <div className="font-medium text-sm text-white">{asset.id}</div>
                                  <div className="text-xs text-slate-400">
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
                                        {Object.entries(asset.details ?? {}).map(([key, value]) => (
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

            <TabsContent value="autonomous" className="space-y-4 sm:space-y-6">
              <Card className="bg-card/50 border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                    Autonomous Data Collection Systems
                  </CardTitle>
                  <CardDescription>
                    Real-time status of our drone and robotics fleet for field data acquisition.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockRobotics.map((robot) => (
                      <Card key={robot.id} className="bg-muted/50">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between text-base">
                            {robot.id}
                            <Badge
                              variant={robot.status === "Active" ? "success" : "secondary"}
                              className={
                                robot.status === "Active"
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-slate-500/20 text-slate-300"
                              }
                            >
                              {robot.status}
                            </Badge>
                          </CardTitle>
                          <CardDescription>{robot.type}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Mission:</span>
                            <span>{robot.mission}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Location:</span>
                            <span>{robot.location}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Battery:</span>
                            <div className="flex items-center gap-2 w-1/2">
                              <Progress value={robot.battery} className="h-2" />
                              <span>{robot.battery}%</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Data:</span>
                            <span>{robot.dataCollected}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="environmental" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base text-white">
                      <Wind className="h-4 w-4 sm:h-5 sm:w-5 text-sky-400" />
                      Air Quality Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-300">Current AQI</span>
                        <span className="text-xl sm:text-2xl font-bold text-white">
                          {mockEnvironmentalData.air_quality.current_aqi}
                        </span>
                      </div>
                      <Progress value={mockEnvironmentalData.air_quality.current_aqi} className="h-2" />
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-slate-400">
                        <div>
                          Status: <Badge className="text-xs">{mockEnvironmentalData.air_quality.status}</Badge>
                        </div>
                        <div>
                          Trend:{" "}
                          <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                            {mockEnvironmentalData.air_quality.trend}
                          </Badge>
                        </div>
                        <div>Sites: {mockEnvironmentalData.air_quality.locations_monitored}</div>
                        <div>Active Alerts: {mockEnvironmentalData.air_quality.alerts_active}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base text-white">
                      <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                      Water Quality Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-300">Compliance Rate</span>
                        <span className="text-xl sm:text-2xl font-bold text-white">
                          {mockEnvironmentalData.water_quality.compliance_rate}%
                        </span>
                      </div>
                      <Progress value={mockEnvironmentalData.water_quality.compliance_rate} className="h-2" />
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-slate-400">
                        <div>Sites Monitored: {mockEnvironmentalData.water_quality.sites_monitored}</div>
                        <div>Contamination Events: {mockEnvironmentalData.water_quality.contamination_events}</div>
                        <div>
                          Trend:{" "}
                          <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
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

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base text-white">
                      <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
                      Weather & Climate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-300">Forecast Accuracy</span>
                        <span className="text-xl sm:text-2xl font-bold text-white">
                          {mockEnvironmentalData.weather.forecast_accuracy}%
                        </span>
                      </div>
                      <Progress value={mockEnvironmentalData.weather.forecast_accuracy} className="h-2" />
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-slate-400">
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

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base text-white">
                      <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                      Wildfire Detection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-300">Active Fires</span>
                        <span className="text-xl sm:text-2xl font-bold text-white">
                          {mockEnvironmentalData.wildfire.active_fires}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-slate-400">
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
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-sm sm:text-base text-white">Detection Performance</CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-slate-400">
                      AI model accuracy across threat types
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-slate-300">Wildfire Detection</span>
                        <span className="font-medium text-xs sm:text-sm text-white">94.2%</span>
                      </div>
                      <Progress value={94.2} />

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-slate-300">Air Quality Prediction</span>
                        <span className="font-medium text-xs sm:text-sm text-white">91.8%</span>
                      </div>
                      <Progress value={91.8} />

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-slate-300">Weather Forecasting</span>
                        <span className="font-medium text-xs sm:text-sm text-white">89.5%</span>
                      </div>
                      <Progress value={89.5} />

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-slate-300">Water Quality Analysis</span>
                        <span className="font-medium text-xs sm:text-sm text-white">96.1%</span>
                      </div>
                      <Progress value={96.1} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-sm sm:text-base text-white">Sector Impact Analysis</CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-slate-400">
                      Cost savings by energy sector
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-slate-300">Electricity</span>
                        <span className="font-medium text-green-400 text-xs sm:text-sm">$2.1M</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-slate-300">Oil & Gas</span>
                        <span className="font-medium text-green-400 text-xs sm:text-sm">$1.8M</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-slate-300">Renewable</span>
                        <span className="font-medium text-green-400 text-xs sm:text-sm">$0.8M</span>
                      </div>

                      <div className="flex justify-between font-bold border-t border-slate-700 pt-2">
                        <span className="text-xs sm:text-sm text-white">Total Savings</span>
                        <span className="text-green-400 text-xs sm:text-sm">$4.7M</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-sm sm:text-base text-white">Response Metrics</CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-slate-400">
                      System performance indicators
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-slate-300">Avg Response Time</span>
                        <span className="font-medium text-xs sm:text-sm text-white">9 minutes</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-slate-300">False Positive Rate</span>
                        <span className="font-medium text-xs sm:text-sm text-white">2.8%</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-slate-300">System Uptime</span>
                        <span className="font-medium text-xs sm:text-sm text-white">99.7%</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-slate-300">Customer Satisfaction</span>
                        <span className="font-medium text-xs sm:text-sm text-white">4.8/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Demo Notice */}
          <Card className="mt-6 sm:mt-8 border-sky-500/30 bg-sky-900/20">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
                <p className="text-sky-300 text-xs sm:text-sm">
                  <strong>Interactive Platform Demo:</strong> This demonstration showcases a fully responsive AI-powered
                  energy infrastructure + environmental monitoring platform. Navigate using the mobile menu (hamburger
                  icon) on mobile devices or the desktop tabs. Click "View Details & Location" on critical alerts to
                  highlight their location on the interactive map. Use "Initiate Response" to activate professional
                  emergency response protocols with real emergency contacts, resource deployment, and comprehensive
                  procedures. The platform tracks active responses and provides complete incident management
                  capabilities for energy infrastructure protection across Canada.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
