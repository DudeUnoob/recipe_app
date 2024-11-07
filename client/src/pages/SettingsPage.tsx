"use client"

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Checkbox } from '../components/ui/checkbox'
import { Card, CardContent, } from '../components/ui/card_main'
import { toast } from '../hooks/use-toast'
import { supabase } from '../lib/supabase'

interface UserPreferences {
  vegetarian: boolean
  vegan: boolean
  glutenFree: boolean
  dairyFree: boolean
  nutFree: boolean
  otherRestrictions: string
}

export default function SettingsPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [preferences, setPreferences] = useState<UserPreferences>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
    otherRestrictions: '',
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      fetchUserPreferences()
    }
  }, [user, navigate])

  const fetchUserPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .single()

      if (error) throw error

      if (data) {
        setPreferences(data)
      }
    } catch (error) {
      console.error('Error fetching user preferences:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch user preferences. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handlePreferenceChange = (key: keyof UserPreferences, value: boolean | string) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({ user_id: user?.id, ...preferences })

      if (error) throw error

      toast({
        title: 'Success',
        description: 'Your preferences have been saved.',
      })
    } catch (error) {
      console.error('Error saving user preferences:', error)
      toast({
        title: 'Error',
        description: 'Failed to save preferences. Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (!user) return null

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <Card className="max-w-2xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Settings</h1>
          <p className="text-gray-600 mb-6">Manage your dietary preferences and restrictions</p>
        </div>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label>Dietary Preferences</Label>
                <div className="flex flex-wrap gap-4">
                  <Checkbox
                    id="vegetarian"
                    checked={preferences.vegetarian}
                    onCheckedChange={(checked: any) => handlePreferenceChange('vegetarian', checked as boolean)}
                  />
                  <Label htmlFor="vegetarian">Vegetarian</Label>

                  <Checkbox
                    id="vegan"
                    checked={preferences.vegan}
                    onCheckedChange={(checked: any) => handlePreferenceChange('vegan', checked as boolean)}
                  />
                  <Label htmlFor="vegan">Vegan</Label>

                  <Checkbox
                    id="glutenFree"
                    checked={preferences.glutenFree}
                    onCheckedChange={(checked: any) => handlePreferenceChange('glutenFree', checked as boolean)}
                  />
                  <Label htmlFor="glutenFree">Gluten-Free</Label>

                  <Checkbox
                    id="dairyFree"
                    checked={preferences.dairyFree}
                    onCheckedChange={(checked: any) => handlePreferenceChange('dairyFree', checked as boolean)}
                  />
                  <Label htmlFor="dairyFree">Dairy-Free</Label>

                  <Checkbox
                    id="nutFree"
                    checked={preferences.nutFree}
                    onCheckedChange={(checked: any) => handlePreferenceChange('nutFree', checked as boolean)}
                  />
                  <Label htmlFor="nutFree">Nut-Free</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherRestrictions">Other Dietary Restrictions or Allergies</Label>
                <Textarea
                  id="otherRestrictions"
                  value={preferences.otherRestrictions}
                  onChange={(e) => handlePreferenceChange('otherRestrictions', e.target.value)}
                  placeholder="Enter any other dietary restrictions or allergies..."
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button type="submit">Save Preferences</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}