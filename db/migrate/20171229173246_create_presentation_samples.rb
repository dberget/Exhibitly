class CreatePresentationSamples < ActiveRecord::Migration[5.2]
  def change
    create_table :presentation_samples do |t|
      t.references :presentation
      t.references :sample

      t.timestamps
    end
  end
end
