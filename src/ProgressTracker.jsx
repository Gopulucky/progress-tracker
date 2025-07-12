import React, { useState, useEffect } from 'react';
import { Calendar, Clock, TrendingUp, Target, BookOpen, Smartphone, Plus, Settings, BarChart3, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgressTracker = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [trackingData, setTrackingData] = useState({
    timeManagement: {
      focusTime: 0,
      breakTime: 0,
      productiveHours: 0,
      distractionTime: 0
    },
    skills: {
      programming: { level: 3, hoursThisWeek: 12, target: 20 },
      design: { level: 2, hoursThisWeek: 8, target: 15 },
      writing: { level: 4, hoursThisWeek: 6, target: 10 }
    },
    habits: {
      exercise: { streak: 5, target: 30 },
      reading: { streak: 12, target: 30 },
      meditation: { streak: 3, target: 21 }
    },
    digitalWellbeing: {
      screenTime: 6.5,
      appUsage: [
        { name: 'Work Apps', hours: 3.2, category: 'productive' },
        { name: 'Social Media', hours: 1.8, category: 'social' },
        { name: 'Entertainment', hours: 1.5, category: 'entertainment' }
      ]
    },
    progressOverTime: [
      {
        area: 'Time Mgmt',
        'Week 1': 20,
        'Week 2': 40,
        'Week 3': 60,
        'Week 4': 80
      },
      {
        area: 'Study Habits',
        'Week 1': 15,
        'Week 2': 35,
        'Week 3': 55,
        'Week 4': 75
      },
      {
        area: 'Skills',
        'Week 1': 10,
        'Week 2': 20,
        'Week 3': 40,
        'Week 4': 60
      },
      {
        area: 'Networking',
        'Week 1': 5,
        'Week 2': 15,
        'Week 3': 25,
        'Week 4': 35
      },
      {
        area: 'Self-Care',
        'Week 1': 30,
        'Week 2': 50,
        'Week 3': 70,
        'Week 4': 90
      },
      {
        area: 'AI Tools',
        'Week 1': 10,
        'Week 2': 25,
        'Week 3': 45,
        'Week 4': 65
      }
    ]
  });

  const [integrations, setIntegrations] = useState({
    calendar: { connected: false, source: 'Google Calendar' },
    digitalWellbeing: { connected: false, source: 'Screen Time' },
    fitness: { connected: false, source: 'Health App' },
    timeTracking: { connected: false, source: 'RescueTime' }
  });

  const sectors = [
    { id: 'time', name: 'Time Management', icon: Clock, color: 'bg-blue-500' },
    { id: 'skills', name: 'Skills Development', icon: BookOpen, color: 'bg-green-500' },
    { id: 'habits', name: 'Habits & Goals', icon: Target, color: 'bg-purple-500' },
    { id: 'digital', name: 'Digital Wellbeing', icon: Smartphone, color: 'bg-orange-500' }
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sectors.map(sector => (
          <div key={sector.id} className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${sector.color}`}>
                <sector.icon className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{sector.name}</h3>
            <p className="text-sm text-gray-600">
              {sector.id === 'time' && 'Focus time: 4.2h today'}
              {sector.id === 'skills' && 'Learning streak: 12 days'}
              {sector.id === 'habits' && 'Goals completed: 3/5'}
              {sector.id === 'digital' && 'Screen time: 6.5h today'}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-4">Weekly Progress</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Productive Hours</span>
              <span className="text-sm font-medium">28h / 40h</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Skills Practice</span>
              <span className="text-sm font-medium">26h / 35h</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '74%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Habit Consistency</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-4">Data Sources</h3>
          <div className="space-y-3">
            {Object.entries(integrations).map(([key, integration]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${integration.connected ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm font-medium">{integration.source}</span>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  {integration.connected ? 'Connected' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="font-semibold text-gray-900 mb-6">Progress Over 4 Weeks</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={trackingData.progressOverTime}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="area" 
                tick={{ fontSize: 12 }}
                interval={0}
              />
              <YAxis 
                label={{ value: 'Progress (%)', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Progress']}
                labelFormatter={(label) => `Area: ${label}`}
              />
              <Legend />
              <Bar dataKey="Week 1" fill="#10B981" name="Week 1" />
              <Bar dataKey="Week 2" fill="#3B82F6" name="Week 2" />
              <Bar dataKey="Week 3" fill="#F59E0B" name="Week 3" />
              <Bar dataKey="Week 4" fill="#EF4444" name="Week 4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Key Insights</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Self-Care shows the strongest improvement trajectory (30% → 90%)</li>
            <li>• Time Management demonstrates consistent weekly growth</li>
            <li>• Networking needs more attention - slowest growth rate</li>
            <li>• AI Tools adoption accelerating in recent weeks</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const TimeManagementTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-2">Focus Time</h3>
          <p className="text-3xl font-bold text-blue-600">4.2h</p>
          <p className="text-sm text-gray-600">Today</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-2">Break Time</h3>
          <p className="text-3xl font-bold text-green-600">1.8h</p>
          <p className="text-sm text-gray-600">Today</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-2">Distraction Time</h3>
          <p className="text-3xl font-bold text-red-600">0.5h</p>
          <p className="text-sm text-gray-600">Today</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="font-semibold text-gray-900 mb-4">Calendar Integration</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Google Calendar</p>
                <p className="text-sm text-gray-600">Sync meetings and scheduled focus blocks</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Connect
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Outlook Calendar</p>
                <p className="text-sm text-gray-600">Alternative calendar sync</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SkillsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(trackingData.skills).map(([skill, data]) => (
          <div key={skill} className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 capitalize">{skill}</h3>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Level {data.level}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">This week</span>
                <span className="font-medium">{data.hoursThisWeek}h / {data.target}h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(data.hoursThisWeek / data.target) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Add New Skill</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            <span>Add Skill</span>
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Track your learning progress across different skills and set weekly practice goals.
        </p>
      </div>
    </div>
  );

  const DigitalWellbeingTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-2">Screen Time Today</h3>
          <p className="text-3xl font-bold text-orange-600">6.5h</p>
          <p className="text-sm text-gray-600">15% less than yesterday</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-2">App Usage</h3>
          <div className="space-y-2">
            {trackingData.digitalWellbeing.appUsage.map((app, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{app.name}</span>
                <span className="text-sm font-medium">{app.hours}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="font-semibold text-gray-900 mb-4">Integration Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">iOS Screen Time</h4>
            <p className="text-sm text-gray-600 mb-3">
              Connect with iOS Screen Time to automatically track app usage and screen time.
            </p>
            <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              Connect iOS
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Android Digital Wellbeing</h4>
            <p className="text-sm text-gray-600 mb-3">
              Sync with Android Digital Wellbeing for comprehensive usage analytics.
            </p>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Connect Android
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="font-semibold text-gray-900 mb-6">Detailed Progress Analysis</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={trackingData.progressOverTime}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="area" 
                tick={{ fontSize: 12 }}
                interval={0}
              />
              <YAxis 
                label={{ value: 'Progress (%)', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Progress']}
                labelFormatter={(label) => `Area: ${label}`}
              />
              <Legend />
              <Bar dataKey="Week 1" fill="#10B981" name="Week 1" />
              <Bar dataKey="Week 2" fill="#3B82F6" name="Week 2" />
              <Bar dataKey="Week 3" fill="#F59E0B" name="Week 3" />
              <Bar dataKey="Week 4" fill="#EF4444" name="Week 4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-4">Growth Insights</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-900">Self-Care</p>
                <p className="text-sm text-green-700">Highest improvement rate</p>
              </div>
              <span className="text-lg font-bold text-green-600">+200%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Time Management</p>
                <p className="text-sm text-blue-700">Consistent growth</p>
              </div>
              <span className="text-lg font-bold text-blue-600">+300%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div>
                <p className="font-medium text-orange-900">Networking</p>
                <p className="text-sm text-orange-700">Needs attention</p>
              </div>
              <span className="text-lg font-bold text-orange-600">+600%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-4">Weekly Trends</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Progress</span>
              <span className="text-sm font-medium">+15% per week</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Best Performing Area</span>
              <span className="text-sm font-medium text-green-600">Self-Care</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Focus Area</span>
              <span className="text-sm font-medium text-orange-600">Networking</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="font-semibold text-gray-900 mb-4">Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Maintain Momentum</h4>
            <p className="text-sm text-blue-700">
              Self-care and time management are performing excellently. Continue current strategies.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Boost Networking</h4>
            <p className="text-sm text-yellow-700">
              Consider scheduling regular networking sessions or joining professional groups.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">AI Tools Integration</h4>
            <p className="text-sm text-green-700">
              Good acceleration in AI tools usage. Explore advanced features for better productivity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3, component: OverviewTab },
    { id: 'time', name: 'Time Management', icon: Clock, component: TimeManagementTab },
    { id: 'skills', name: 'Skills', icon: BookOpen, component: SkillsTab },
    { id: 'digital', name: 'Digital Wellbeing', icon: Smartphone, component: DigitalWellbeingTab },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp, component: () => <AnalyticsTab /> }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || OverviewTab;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Tracker</h1>
          <p className="text-gray-600">Track your progress across time management, skills, habits, and digital wellbeing</p>
        </div>

        <div className="mb-8">
          <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <ActiveComponent />
      </div>
    </div>
  );
};

export default ProgressTracker;